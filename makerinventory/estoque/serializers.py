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

class SaidaSerializer(serializers.ModelSerializer):
    # Exibir nome/código no GET, mas enviar apenas IDs no POST
    item_nome = serializers.CharField(source="item.nome", read_only=True)
    item_codigo = serializers.CharField(source="item.codigo", read_only=True)

    lote_nome = serializers.CharField(source="lote.nome", read_only=True)
    lote_codigo = serializers.CharField(source="lote.codigo", read_only=True)

    class Meta:
        model = Saida
        fields = [
            "id",
            "item",
            "item_nome",
            "item_codigo",
            "lote",
            "lote_nome",
            "lote_codigo",
            "quantidade",
            "data_saida",
            "responsavel",
            "observacao",
        ]

    def validate(self, data):
        item = data.get("item")
        lote = data.get("lote")
        quant = data.get("quantidade")

        if item and lote:
            raise serializers.ValidationError(
                "A saída deve ter somente item OU lote, não ambos."
            )

        if not item and not lote:
            raise serializers.ValidationError(
                "A saída deve ter um item ou um lote."
            )

        # VALIDAÇÃO DO LOTE
        if lote:
            lote_obj = Lote.objects.get(id=lote.id)

            if quant is None or quant <= 0:
                raise serializers.ValidationError(
                    "A quantidade deve ser maior que zero para saídas de lote."
                )

            if lote_obj.quantidade < quant:
                raise serializers.ValidationError(
                    f"O lote não possui quantidade suficiente. Disponível: {lote_obj.quantidade}"
                )

        return data

