from decimal import Decimal
from django.db import models
from django.db.models import Q, Sum
from django.core.exceptions import ValidationError
from django.utils import timezone
import uuid

class Categoria(models.Model):
    nome = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Subcategoria(models.Model):
    nome = models.CharField(max_length=100, unique=True)
    categoria = models.ForeignKey(Categoria, related_name="subcategorias", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Subcategoria"
        verbose_name_plural = "Subcategorias"
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class ProdutoUnitario(models.Model):
    subcategoria = models.ForeignKey(Subcategoria, related_name="produtos_unitarios", on_delete=models.CASCADE)
    foto = models.ImageField(upload_to='img/produtos/unitarios/', blank=True, null=True)
    nome = models.CharField(max_length=100)
    quantidade_minima = models.PositiveIntegerField()

    @property
    def quantidade_em_estoque(self):
        return self.itens.filter(disponibilidade=True).count()

    class Meta:
        verbose_name = "Produto Unitário"
        verbose_name_plural = "Produtos Unitários"
        ordering = ["nome"]

    def __str__(self):
        return self.nome


class Item(models.Model):
    produto = models.ForeignKey(ProdutoUnitario, related_name="itens", on_delete=models.CASCADE)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    codigo = models.CharField(max_length=30, unique=True, editable=False)
    foto = models.ImageField(upload_to='img/itens', blank=True, null=True)

    # se você quer armazenar o nome do produto no item (histórico), mantenha esse campo
    nome = models.CharField(max_length=100)

    eh_do_cnatmaker = models.BooleanField()  # True(É do CNAT Maker) False(É do IFRN)
    disponibilidade = models.BooleanField(default=True)
    eh_quebrado = models.BooleanField(default=False)
    data_entrada = models.DateTimeField(auto_now_add=True)
    eh_emprestado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Itens"
        ordering = ["nome"]  # agora existe o campo 'nome'

    def save(self, *args, **kwargs):
        # copia o nome do produto (preserva histórico)
        if self.produto and not self.nome:
            self.nome = self.produto.nome

        # gera um código único se não existir
        if not self.codigo:
            # exemplo simples com uuid curto; troque se quiser esquema sequencial
            self.codigo = f"ITM-{uuid.uuid4().hex[:10].upper()}"

        super().save(*args, **kwargs)

    def __str__(self):
        # exibe nome salvo + código para ajudar identificação
        return f"{self.nome} ({self.codigo})"


class ProdutoFracionado(models.Model):
    UNIDADES_DE_MEDIDA = [
        ('kg', 'Quilograma'),
        ('g', 'Grama'),
        ('l', 'Litro'),
        ('ml', 'Mililitro'),
        ('m', 'Metro'),
        ('cm', 'Centímetro'),
    ]
    foto = models.ImageField(upload_to='img/produto/fracionado', blank=True, null=True)
    nome = models.CharField(max_length=100)
    unidade_de_medida = models.CharField(max_length=10, choices=UNIDADES_DE_MEDIDA)
    quantidade_minima = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = "Produto Fracionado"
        verbose_name_plural = "Produtos Fracionados"
        ordering = ["nome"]

    def __str__(self):
        return self.nome

    @property
    def quantidade_em_estoque(self):
        hoje = timezone.now().date()
        total = (
            self.lotes
            .filter(Q(data_validade__isnull=True) | Q(data_validade__gte=hoje))
            .aggregate(total=Sum('quantidade'))['total']
        )
        return total if total is not None else Decimal('0')

class Lote(models.Model):
    foto = models.ImageField(upload_to='img/produto/fracionado', blank=True, null=True)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    fornecedor = models.CharField(max_length=100, blank=True, null=True)
    produto = models.ForeignKey(ProdutoFracionado, related_name="lotes", on_delete=models.CASCADE)
    quantidade = models.DecimalField(max_digits=10, decimal_places=2)
    data_validade = models.DateField(blank=True, null=True)
    data_entrada = models.DateTimeField(auto_now_add=True)
    codigo = models.CharField(max_length=30, unique=True, editable=False)
    nome = models.CharField(max_length=100, editable=False)

    class Meta:
        verbose_name = "Lote"
        verbose_name_plural = "Lotes"
        ordering = ["-data_entrada"]

    def save(self, *args, **kwargs):
        # copia o nome do produto (para histórico)
        if self.produto and not self.nome:
            self.nome = self.produto.nome

        # gera um código único se não existir
        if not self.codigo:
            self.codigo = f"LOT-{uuid.uuid4().hex[:10].upper()}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nome} ({self.codigo}) — {self.quantidade} {self.produto.unidade_de_medida}"

class Solicitante(models.Model):
    nome = models.CharField(max_length=100)
    telefone = models.CharField(max_length=15, blank=True, null=True)

    class Meta:
        verbose_name = "Solicitante"
        verbose_name_plural = "Solicitantes"
        ordering = ["nome"]

    def __str__(self):
        return self.nome

class Emprestimo(models.Model):
    solicitante = models.ForeignKey('Solicitante', related_name='emprestimos', on_delete=models.CASCADE)
    itens = models.ManyToManyField('Item', related_name='emprestimos')
    data_emprestimo = models.DateTimeField()
    previsao_entrega = models.DateTimeField()
    data_entrega = models.DateTimeField(null=True, blank=True)
    responsavel = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Empréstimo"
        verbose_name_plural = "Empréstimos"
        ordering = ["-data_emprestimo"]

    def clean(self):
        if self.data_emprestimo and self.data_emprestimo > timezone.now():
            raise ValidationError("A data de empréstimo não pode ser no futuro.")

        if self.previsao_entrega and self.data_emprestimo:
            if self.previsao_entrega < self.data_emprestimo:
                raise ValidationError("A previsão de entrega não pode ser anterior à data de empréstimo.")

        if self.data_entrega and self.data_emprestimo:
            if self.data_entrega < self.data_emprestimo:
                raise ValidationError("A data de entrega não pode ser anterior à data de empréstimo.")

    def __str__(self):
        return f"Empréstimo ({self.id}) - {self.solicitante}"


class MovimentacaoEstoque(models.Model):
    TIPO_MOVIMENTACAO = [
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
        ('emprestimo', 'Empréstimo'),
        ('devolucao', 'Devolução'),
    ]

    # vincule a um item (unitário) ou a um lote (fracionado)
    item = models.ForeignKey('Item', null=True, blank=True, on_delete=models.SET_NULL, related_name='movimentacoes')
    lote = models.ForeignKey('Lote', null=True, blank=True, on_delete=models.SET_NULL, related_name='movimentacoes')

    # snapshot do nome do produto no momento da movimentação (útil para histórico)
    produto_nome = models.CharField(max_length=200, blank=True)

    tipo_movimentacao = models.CharField(max_length=20, choices=TIPO_MOVIMENTACAO)
    quantidade = models.DecimalField(max_digits=10, decimal_places=2)
    data_movimentacao = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Movimentação de Estoque"
        verbose_name_plural = "Movimentações de Estoque"
        ordering = ["-data_movimentacao"]

    def clean(self):
        if not self.item and not self.lote:
            raise ValidationError("A movimentação deve estar vinculada a um item ou a um lote.")

        if self.item:
            self.quantidade = Decimal('1')

        elif self.lote and self.quantidade <= Decimal('0'):
            raise ValidationError("A quantidade deve ser maior que zero.")

    def save(self, *args, **kwargs):
        if self.item:
            self.produto_nome = self.item.produto.nome
        elif self.lote:
            self.produto_nome = self.lote.produto.nome
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.get_tipo_movimentacao_display()} de {self.quantidade} ({self.produto_nome}) em {self.data_movimentacao}"
