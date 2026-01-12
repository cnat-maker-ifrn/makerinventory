from rest_framework import viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from datetime import datetime, timedelta
from django.db.models import Count, Q
from django.db.models.functions import ExtractMonth
from rest_framework.permissions import AllowAny
from .permissions import IsAuthenticatedOrReadOnly

from .models import (
    Categoria, Subcategoria, ProdutoUnitario, Item,
    ProdutoFracionado, Lote, Solicitante, Emprestimo,
    MovimentacaoEstoque, Devolucao, Saida
)
from .serializers import (
    CategoriaSerializer, SubcategoriaSerializer, ProdutoUnitarioSerializer,
    ItemSerializer, ProdutoFracionadoSerializer, LoteSerializer,
    SolicitanteSerializer, EmprestimoSerializer, MovimentacaoEstoqueSerializer,
    DevolucaoSerializer, SaidaSerializer, MatriculaTokenObtainPairSerializer
)

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = MatriculaTokenObtainPairSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None

    @action(detail=True, methods=["get"])
    def subcategorias(self, request, pk=None):
        categoria = self.get_object()
        serializer = SubcategoriaSerializer(categoria.subcategorias.all(), many=True)
        return Response(serializer.data)

class SubcategoriaViewSet(viewsets.ModelViewSet):
    queryset = Subcategoria.objects.select_related("categoria").all()
    serializer_class = SubcategoriaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = None

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
    permission_classes = [IsAuthenticatedOrReadOnly]

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
    queryset = Item.objects.select_related("produto").all().order_by("-data_entrada")
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['nome', 'codigo', 'produto__nome']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por data inicial
        data_inicio = self.request.query_params.get('data_inicio')
        if data_inicio:
            queryset = queryset.filter(data_entrada__gte=data_inicio)
        
        # Filtro por data final
        data_fim = self.request.query_params.get('data_fim')
        if data_fim:
            queryset = queryset.filter(data_entrada__lte=f"{data_fim} 23:59:59")
        
        return queryset

    @action(detail=False, methods=["get"])
    def disponiveis(self, request):
        itens = self.queryset.filter(disponibilidade=True, eh_emprestado=False)
        serializer = self.get_serializer(itens, many=True)
        return Response(serializer.data)

class ProdutoFracionadoViewSet(viewsets.ModelViewSet):
    queryset = ProdutoFracionado.objects.prefetch_related("lotes").all()
    serializer_class = ProdutoFracionadoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['nome', 'descricao']

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
    queryset = Lote.objects.select_related("produto").all().order_by("-data_entrada")
    serializer_class = LoteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['codigo', 'produto__nome', 'fornecedor']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por data inicial
        data_inicio = self.request.query_params.get('data_inicio')
        if data_inicio:
            queryset = queryset.filter(data_entrada__gte=data_inicio)
        
        # Filtro por data final
        data_fim = self.request.query_params.get('data_fim')
        if data_fim:
            queryset = queryset.filter(data_entrada__lte=f"{data_fim} 23:59:59")
        
        return queryset

    @action(detail=False, methods=["get"], url_path="mais-usados")
    def lotes_mais_usados(self, request):
        lotes = (
            Lote.objects
            .annotate(
                usado=Count(
                    "movimentacoes",
                    filter=Q(movimentacoes__tipo_movimentacao__in=["saida", "emprestimo"])
                )
            )
            .filter(usado__gt=0)
            .order_by("-usado")[:5]
        )

        dados = [
            {
                "id": l.id,
                "codigo": l.codigo,
                "produto": l.produto.nome,
                "usado": l.usado,
            }
            for l in lotes
        ]

        return Response(dados)

class SolicitanteViewSet(viewsets.ModelViewSet):
    queryset = Solicitante.objects.all()
    serializer_class = SolicitanteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class EmprestimoViewSet(viewsets.ModelViewSet):
    queryset = Emprestimo.objects.select_related("solicitante").prefetch_related("itens").all().order_by("-data_emprestimo")
    serializer_class = EmprestimoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['solicitante__nome', 'responsavel']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por data inicial
        data_inicio = self.request.query_params.get('data_inicio')
        if data_inicio:
            queryset = queryset.filter(data_emprestimo__gte=data_inicio)
        
        # Filtro por data final
        data_fim = self.request.query_params.get('data_fim')
        if data_fim:
            queryset = queryset.filter(data_emprestimo__lte=f"{data_fim} 23:59:59")
        
        return queryset

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
    permission_classes = [IsAuthenticatedOrReadOnly]

class MovimentacaoEstoqueViewSet(viewsets.ModelViewSet):
    queryset = MovimentacaoEstoque.objects.select_related("item", "lote").all().order_by("-data_movimentacao")
    serializer_class = MovimentacaoEstoqueSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['tipo_movimentacao', 'item__nome', 'lote__nome']
    filterset_fields = ['data_movimentacao']

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por data inicial
        data_inicio = self.request.query_params.get('data_inicio')
        if data_inicio:
            queryset = queryset.filter(data_movimentacao__gte=data_inicio)
        
        # Filtro por data final
        data_fim = self.request.query_params.get('data_fim')
        if data_fim:
            queryset = queryset.filter(data_movimentacao__lte=f"{data_fim} 23:59:59")
        
        return queryset

    @action(detail=False, methods=["get"], url_path="entradas-saidas-12m")
    def entradas_saidas_12_meses(self, request):
        ano_atual = datetime.today().year
        inicio_ano = datetime(ano_atual, 1, 1)
        fim_ano = datetime(ano_atual, 12, 31)

        movs = (
            MovimentacaoEstoque.objects
            .filter(data_movimentacao__gte=inicio_ano, data_movimentacao__lte=fim_ano)
            .annotate(mes=ExtractMonth("data_movimentacao"))
            .values("mes", "tipo_movimentacao")
            .annotate(total=Count("id")) 
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
    queryset = Saida.objects.select_related("item", "lote").all().order_by("-data_saida")
    serializer_class = SaidaSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["responsavel", "item__produto__nome", "lote__produto__nome"]
    ordering_fields = ["data_saida", "quantidade"]

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtro por data inicial
        data_inicio = self.request.query_params.get('data_inicio')
        if data_inicio:
            queryset = queryset.filter(data_saida__gte=data_inicio)
        
        # Filtro por data final
        data_fim = self.request.query_params.get('data_fim')
        if data_fim:
            queryset = queryset.filter(data_saida__lte=f"{data_fim} 23:59:59")
        
        return queryset

    def create(self, request, *args, **kwargs):
        """
        Criação de Saída.
        A lógica de movimentação é feita automaticamente pelo signal.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        saida = serializer.save() 

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