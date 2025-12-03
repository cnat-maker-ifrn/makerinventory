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
    subcategoria_nome = serializers.CharField(source="subcategoria.nome", read_only=True)
    quantidade_em_estoque = serializers.IntegerField(read_only=True)

    subcategoria = serializers.PrimaryKeyRelatedField(
        queryset=Subcategoria.objects.all()
    )

    class Meta:
        model = ProdutoUnitario
        fields = "__all__"

class ItemSerializer(serializers.ModelSerializer):
    produto = serializers.PrimaryKeyRelatedField(
        queryset=ProdutoUnitario.objects.all()
    )

    produto_detalhes = ProdutoUnitarioSerializer(source="produto", read_only=True)

    class Meta:
        model = Item
        fields = "__all__"
        read_only_fields = ["codigo", "disponibilidade", "eh_emprestado"]

class ProdutoFracionadoSerializer(serializers.ModelSerializer):
    quantidade_em_estoque = serializers.ReadOnlyField()
    subcategoria_nome = serializers.CharField(source="subcategoria.nome", read_only=True)
    subcategoria = serializers.PrimaryKeyRelatedField(queryset=Subcategoria.objects.all())

    class Meta:
        model = ProdutoFracionado
        fields = [
            "id",
            "nome",
            "foto",
            "unidade_de_medida",
            "quantidade_minima",
            "subcategoria",
            "subcategoria_nome",
            "quantidade_em_estoque",
        ]


class LoteSerializer(serializers.ModelSerializer):
    produto = ProdutoFracionadoSerializer(read_only=True)
    produto_id = serializers.PrimaryKeyRelatedField(
        queryset=ProdutoFracionado.objects.all(),
        source="produto",
        write_only=True
    )

    class Meta:
        model = Lote
        fields = "__all__"

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

