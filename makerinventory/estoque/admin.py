from django.contrib import admin
from .models import Categoria, Subcategoria, ProdutoUnitario, ProdutoFracionado, Item, Lote, Saida, Solicitante, Emprestimo, MovimentacaoEstoque

admin.site.register(Categoria)
admin.site.register(Subcategoria)
admin.site.register(ProdutoUnitario)
admin.site.register(ProdutoFracionado)
admin.site.register(Item)
admin.site.register(Lote)
admin.site.register(Saida)
admin.site.register(Solicitante)
admin.site.register(Emprestimo)
admin.site.register(MovimentacaoEstoque)
