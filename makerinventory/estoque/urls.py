from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .views import (
    CategoriaViewSet, LoginView, SubcategoriaViewSet,
    ProdutoUnitarioViewSet, ItemViewSet, ProdutoFracionadoViewSet,
    LoteViewSet, SolicitanteViewSet, EmprestimoViewSet,
    MovimentacaoEstoqueViewSet, DevolucaoViewSet, SaidaViewSet
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

@api_view(['GET'])
def estoque_baixo_consolidado(request):
    """Retorna produtos com estoque baixo consolidados de unitários e fracionados"""
    from .models import ProdutoUnitario, ProdutoFracionado
    
    resultado = []
    
    # Unitários
    for p in ProdutoUnitario.objects.all():
        qtd = p.quantidade_em_estoque
        if qtd <= p.quantidade_minima:
            resultado.append({
                "id": p.id,
                "nome": p.nome,
                "quantidade": qtd,
                "quantidade_minima": p.quantidade_minima,
                "tipo": "unitario",
                "unidade_de_medida": None,
                "foto": p.foto.url if p.foto else None,
                "subcategoria": p.subcategoria.nome
            })
    
    # Fracionados
    for p in ProdutoFracionado.objects.all():
        qtd = p.quantidade_em_estoque or 0
        if qtd <= p.quantidade_minima:
            resultado.append({
                "id": p.id,
                "nome": p.nome,
                "quantidade": qtd,
                "quantidade_minima": p.quantidade_minima,
                "tipo": "fracionado",
                "unidade_de_medida": p.unidade_de_medida,
                "foto": p.foto.url if p.foto else None,
                "subcategoria": p.subcategoria.nome
            })
    
    return Response(resultado)

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    # compatibility endpoints used by the frontend at /api/auth/*
    path("auth/login/", LoginView.as_view(), name="auth_login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="auth_token_refresh"),
    path("estoque-baixo/", estoque_baixo_consolidado, name="estoque-baixo"),
    path("", include(router.urls)),
]
