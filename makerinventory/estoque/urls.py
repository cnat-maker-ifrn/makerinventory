from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .views import (
    CategoriaViewSet, LoginView, SubcategoriaViewSet,
    ProdutoUnitarioViewSet, ItemViewSet, ProdutoFracionadoViewSet,
    LoteViewSet, SolicitanteViewSet, EmprestimoViewSet,
    MovimentacaoEstoqueViewSet, DevolucaoViewSet, SaidaViewSet, estoque_baixo
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
    path("login/", LoginView.as_view(), name="login"),
    path("auth/login/", LoginView.as_view(), name="auth_login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("estoque-baixo/", estoque_baixo, name="estoque-baixo"),
    path("", include(router.urls)),
]
