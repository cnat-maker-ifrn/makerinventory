from rest_framework import serializers
from .models import *

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class SubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategoria
        fields = '__all__'

class ProdutoUnitarioSerializer(serializers.ModelSerializer):
    quantidade_em_estoque = serializers.ReadOnlyField()

    class Meta:
        model = ProdutoUnitario
        fields = '__all__'

class ItemSerializer(serializers.ModelSerializer):
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)

    class Meta:
        model = Item
        fields = '__all__'

class ProdutoFracionadoSerializer(serializers.ModelSerializer):
    quantidade_em_estoque = serializers.ReadOnlyField()

    class Meta:
        model = ProdutoFracionado
        fields = '__all__'

class LoteSerializer(serializers.ModelSerializer):
    produto_nome = serializers.CharField(source='produto.nome', read_only=True)

    class Meta:
        model = Lote
        fields = '__all__'

class SolicitanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Solicitante
        fields = '__all__'

class EmprestimoSerializer(serializers.ModelSerializer):
    itens = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)
    solicitante_nome = serializers.CharField(source='solicitante.nome', read_only=True)

    class Meta:
        model = Emprestimo
        fields = '__all__'

class DevolucaoSerializer(serializers.ModelSerializer):
    itens = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), many=True)
    emprestimo_id = serializers.IntegerField(source='emprestimo.id', read_only=True)

    class Meta:
        model = Devolucao
        fields = '__all__'

class MovimentacaoEstoqueSerializer(serializers.ModelSerializer):
    produto_nome = serializers.ReadOnlyField()

    class Meta:
        model = MovimentacaoEstoque
        fields = '__all__'

