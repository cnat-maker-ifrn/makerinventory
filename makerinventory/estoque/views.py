from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from django.db.models import Sum
from .models import (
    Categoria, Subcategoria, ProdutoUnitario, Item,
    ProdutoFracionado, Lote, Solicitante, Emprestimo, MovimentacaoEstoque
)
from .serializers import (
    CategoriaSerializer, SubcategoriaSerializer, ProdutoUnitarioSerializer,
    ItemSerializer, ProdutoFracionadoSerializer, LoteSerializer,
    SolicitanteSerializer, EmprestimoSerializer, MovimentacaoEstoqueSerializer
)

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class SubcategoriaViewSet(viewsets.ModelViewSet):
    queryset = Subcategoria.objects.select_related("categoria").all()
    serializer_class = SubcategoriaSerializer


class ProdutoUnitarioViewSet(viewsets.ModelViewSet):
    queryset = ProdutoUnitario.objects.prefetch_related("itens").all()
    serializer_class = ProdutoUnitarioSerializer

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

class LoteViewSet(viewsets.ModelViewSet):
    queryset = Lote.objects.select_related("produto").all()
    serializer_class = LoteSerializer

class SolicitanteViewSet(viewsets.ModelViewSet):
    queryset = Solicitante.objects.all()
    serializer_class = SolicitanteSerializer

class EmprestimoViewSet(viewsets.ModelViewSet):
    queryset = Emprestimo.objects.select_related("solicitante").prefetch_related("itens").all()
    serializer_class = EmprestimoSerializer

    def perform_create(self, serializer):
        emprestimo = serializer.save()
        emprestimo.itens.update(eh_emprestado=True, disponibilidade=False)

class MovimentacaoEstoqueViewSet(viewsets.ModelViewSet):
    queryset = MovimentacaoEstoque.objects.select_related("item", "lote").all()
    serializer_class = MovimentacaoEstoqueSerializer

