from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import (
    CategoriaViewSet, SubcategoriaViewSet, ProdutoUnitarioViewSet,
    ItemViewSet, ProdutoFracionadoViewSet, LoteViewSet,
    SolicitanteViewSet, EmprestimoViewSet, MovimentacaoEstoqueViewSet, DevolucaoViewSet, SaidaViewSet
)

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'subcategorias', SubcategoriaViewSet)
router.register(r'produtos-unitarios', ProdutoUnitarioViewSet)
router.register(r'itens', ItemViewSet)
router.register(r'produtos-fracionados', ProdutoFracionadoViewSet)
router.register(r'lotes', LoteViewSet)
router.register(r'solicitantes', SolicitanteViewSet)
router.register(r'emprestimos', EmprestimoViewSet)
router.register(r'devolucoes', DevolucaoViewSet)
router.register(r'movimentacoes', MovimentacaoEstoqueViewSet)
router.register(r'saidas', SaidaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
