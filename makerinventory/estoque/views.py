from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import (
    Categoria, Subcategoria, ProdutoUnitario, Item,
    ProdutoFracionado, Lote, Solicitante, Emprestimo,
    MovimentacaoEstoque, Devolucao
)
from .serializers import (
    CategoriaSerializer, SubcategoriaSerializer, ProdutoUnitarioSerializer,
    ItemSerializer, ProdutoFracionadoSerializer, LoteSerializer,
    SolicitanteSerializer, EmprestimoSerializer, MovimentacaoEstoqueSerializer,
    DevolucaoSerializer
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

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.select_related("produto").all()
    serializer_class = ItemSerializer

    @action(detail=False, methods=["get"])
    def disponiveis(self, request):
        itens = self.queryset.filter(disponibilidade=True, eh_emprestado=False)
        serializer = self.get_serializer(itens, many=True)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        item = serializer.save()

        produto = item.produto
        produto.quantidade_em_estoque = produto.itens.filter(disponibilidade=True).count()
        produto.save()

    def perform_destroy(self, instance):
        produto = instance.produto
        instance.delete()
        produto.quantidade_em_estoque = produto.itens.filter(disponibilidade=True).count()
        produto.save()

class ProdutoFracionadoViewSet(viewsets.ModelViewSet):
    queryset = ProdutoFracionado.objects.prefetch_related("lotes").all()
    serializer_class = ProdutoFracionadoSerializer

    @action(detail=True, methods=["get"], url_path="lotes")
    def lotes(self, request, pk=None):
        produto = self.get_object()
        serializer = LoteSerializer(produto.lotes.all(), many=True)
        return Response(serializer.data)

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
