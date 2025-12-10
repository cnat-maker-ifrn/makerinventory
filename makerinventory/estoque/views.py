from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from datetime import datetime, timedelta
from django.db.models import Count
from django.db.models.functions import ExtractMonth

from .models import (
    Categoria, Subcategoria, ProdutoUnitario, Item,
    ProdutoFracionado, Lote, Solicitante, Emprestimo,
    MovimentacaoEstoque, Devolucao, Saida
)
from .serializers import (
    CategoriaSerializer, SubcategoriaSerializer, ProdutoUnitarioSerializer,
    ItemSerializer, ProdutoFracionadoSerializer, LoteSerializer,
    SolicitanteSerializer, EmprestimoSerializer, MovimentacaoEstoqueSerializer,
    DevolucaoSerializer, SaidaSerializer
)


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

    @action(detail=True, methods=["get"])
    def subcategorias(self, request, pk=None):
        categoria = self.get_object()
        serializer = SubcategoriaSerializer(categoria.subcategorias.all(), many=True)
        return Response(serializer.data)

class SubcategoriaViewSet(viewsets.ModelViewSet):
    queryset = Subcategoria.objects.select_related("categoria").all()
    serializer_class = SubcategoriaSerializer

    @action(detail=True, methods=["get"], url_path="produtos-unitarios")
    def produtos_unitarios(self, request, pk=None):
        subcategoria = self.get_object()
        produtos = subcategoria.produtos_unitarios.all()
        serializer = ProdutoUnitarioSerializer(produtos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"], url_path="produtos-fracionados")
    def produtos_fracionados(self, request, pk=None):
        subcategoria = self.get_object()
        produtos = subcategoria.produtos_fracionados.all()
        serializer = ProdutoFracionadoSerializer(produtos, many=True)
        return Response(serializer.data)

class ProdutoUnitarioViewSet(viewsets.ModelViewSet):
    queryset = ProdutoUnitario.objects.prefetch_related("itens").all()
    serializer_class = ProdutoUnitarioSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['nome', 'descricao']

    @action(detail=True, methods=["get"], url_path="itens")
    def itens(self, request, pk=None):
        produto = self.get_object()
        serializer = ItemSerializer(produto.itens.all(), many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["get"], url_path="estoque-baixo")
    def estoque_baixo(self, request):
        produtos = ProdutoUnitario.objects.all()
        resultado = []

        for p in produtos:
            qtd = p.quantidade_em_estoque
            if qtd <= p.quantidade_minima:
                resultado.append({
                    "id": p.id,
                    "nome": p.nome,
                    "quantidade": qtd,
                    "quantidade_minima": p.quantidade_minima
                })

        return Response(resultado)
    
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.select_related("produto").all()
    serializer_class = ItemSerializer

    @action(detail=False, methods=["get"])
    def disponiveis(self, request):
        itens = self.queryset.filter(disponibilidade=True, eh_emprestado=False)
        serializer = self.get_serializer(itens, many=True)
        return Response(serializer.data)

class ProdutoFracionadoViewSet(viewsets.ModelViewSet):
    queryset = ProdutoFracionado.objects.prefetch_related("lotes").all()
    serializer_class = ProdutoFracionadoSerializer

    @action(detail=True, methods=["get"], url_path="lotes")
    def lotes(self, request, pk=None):
        produto = self.get_object()
        serializer = LoteSerializer(produto.lotes.all(), many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="estoque-baixo")
    def estoque_baixo(self, request):
        produtos = ProdutoFracionado.objects.all()
        resultado = []

        for p in produtos:
            qtd = p.quantidade_em_estoque or 0
            if qtd <= p.quantidade_minima:
                resultado.append({
                    "id": p.id,
                    "nome": p.nome,
                    "quantidade": qtd,
                    "quantidade_minima": p.quantidade_minima
                })

        return Response(resultado)


class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.select_related("produto").all()
    serializer_class = LoteSerializer

class SolicitanteViewSet(viewsets.ModelViewSet):
    queryset = Solicitante.objects.all()
    serializer_class = SolicitanteSerializer

class EmprestimoViewSet(viewsets.ModelViewSet):
    queryset = Emprestimo.objects.select_related("solicitante").prefetch_related("itens").all()
    serializer_class = EmprestimoSerializer

    @action(detail=False, methods=["get"], url_path="ativos")
    def ativos(self, request):
        emprestimos = self.queryset.filter(finalizado=False)
        serializer = self.get_serializer(emprestimos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="finalizados")
    def finalizados(self, request):
        emprestimos = self.queryset.filter(finalizado=True)
        serializer = self.get_serializer(emprestimos, many=True)
        return Response(serializer.data)

class DevolucaoViewSet(viewsets.ModelViewSet):
    queryset = Devolucao.objects.select_related("emprestimo").prefetch_related("itens").all()
    serializer_class = DevolucaoSerializer

class MovimentacaoEstoqueViewSet(viewsets.ModelViewSet):
    queryset = MovimentacaoEstoque.objects.select_related("item", "lote").all()
    serializer_class = MovimentacaoEstoqueSerializer

    @action(detail=False, methods=["get"], url_path="entradas-saidas-12m")
    def entradas_saidas_12_meses(self, request):
        hoje = datetime.today()
        ano_atras = hoje - timedelta(days=365)

        movs = (
            MovimentacaoEstoque.objects
            .filter(data_movimentacao__gte=ano_atras)
            .annotate(mes=ExtractMonth("data_movimentacao"))
            .values("mes", "tipo_movimentacao")
            .annotate(total=Count("id"))  # ⬅️ AQUI: contar, não somar quantidade
            .order_by("mes")
        )

        meses_nomes = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]

        dados = [
            {"mes": meses_nomes[m - 1], "entradas": 0, "saidas": 0}
            for m in range(1, 13)
        ]

        for m in movs:
            idx = m["mes"] - 1
            if m["tipo_movimentacao"] == "entrada":
                dados[idx]["entradas"] = m["total"]
            else:
                dados[idx]["saidas"] = m["total"]

        return Response(dados)

class SaidaViewSet(viewsets.ModelViewSet):
    """
    CRUD de saídas de estoque.
    As movimentações são criadas automaticamente via signals.
    """
    queryset = Saida.objects.select_related("item", "lote").all()
    serializer_class = SaidaSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["responsavel", "item__produto__nome", "lote__produto__nome"]
    ordering_fields = ["data_saida", "quantidade"]

    def create(self, request, *args, **kwargs):
        """
        Criação de Saída.
        A lógica de movimentação é feita automaticamente pelo signal.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        saida = serializer.save()  # cria a saída normal

        return Response(
            SaidaSerializer(saida).data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=["get"], url_path="por-item")
    def por_item(self, request):
        """Filtra saídas que possuem item unitário."""
        qs = self.queryset.filter(item__isnull=False)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="por-lote")
    def por_lote(self, request):
        """Filtra saídas que possuem lote fracionado."""
        qs = self.queryset.filter(lote__isnull=False)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)