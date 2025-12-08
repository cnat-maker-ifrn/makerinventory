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
    foto = models.ImageField(upload_to='img/produto/unitario/', blank=True, null=True)
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
    produto = models.ForeignKey(ProdutoUnitario, related_name="itens", on_delete=models.PROTECT)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    codigo = models.CharField(max_length=30, unique=True, editable=False)
    foto = models.ImageField(upload_to='img/itens', blank=True, null=True)

    nome = models.CharField(max_length=100)

    eh_do_cnatmaker = models.BooleanField()  # True(É do CNAT Maker) False(É do IFRN)
    disponibilidade = models.BooleanField(default=True)
    eh_quebrado = models.BooleanField(default=False)
    data_entrada = models.DateTimeField(auto_now_add=True)
    eh_emprestado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Item"
        verbose_name_plural = "Itens"
        ordering = ["nome"] 

    def save(self, *args, **kwargs):
        if self.produto and not self.nome:
            self.nome = self.produto.nome

        if not self.codigo:
            self.codigo = f"ITM-{uuid.uuid4().hex[:10].upper()}"

        super().save(*args, **kwargs)

    def __str__(self):
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
    subcategoria = models.ForeignKey(Subcategoria, related_name="produtos_fracionados", on_delete=models.PROTECT)
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
        return total
    
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
        if self.produto and not self.nome:
            self.nome = self.produto.nome

        if not self.codigo:
            self.codigo = f"LOT-{uuid.uuid4().hex[:10].upper()}"

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.nome} ({self.codigo}) — {self.quantidade} {self.produto.unidade_de_medida}"

class Solicitante(models.Model):
    nome = models.CharField(max_length=100)
    matricula = models.CharField(unique=True)
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

class Devolucao(models.Model):
    emprestimo = models.ForeignKey(Emprestimo, related_name='devolucoes', on_delete=models.CASCADE)
    itens = models.ManyToManyField(Item, related_name='devolucoes')
    data_devolucao = models.DateTimeField(auto_now_add=True)
    observacao = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Devolução"
        verbose_name_plural = "Devoluções"
        ordering = ["-data_devolucao"]

    def clean(self):
        # Evita devolver item que não pertence ao empréstimo
        for item in self.itens.all():
            if item not in self.emprestimo.itens.all():
                raise ValidationError(f"O item {item} não pertence a este empréstimo.")

    def __str__(self):
        return f"Devolução #{self.id} do Empréstimo #{self.emprestimo.id}"

class Saida(models.Model):
    item = models.ForeignKey('Item', on_delete=models.PROTECT, null=True, blank=True,
    related_name='saidas')

    lote = models.ForeignKey('Lote', on_delete=models.PROTECT, null=True, blank=True,related_name='saidas')

    quantidade = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('1.00'),
    help_text="Usado apenas se a saída for de lote (produto fracionado).")

    data_saida = models.DateTimeField(default=timezone.now)
    responsavel = models.CharField(max_length=100)
    observacao = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Saída"
        verbose_name_plural = "Saídas"
        ordering = ["-data_saida"]

    def clean(self):
        if not self.item and not self.lote:
            raise ValidationError("A saída deve estar vinculada a um item ou a um lote.")

        if self.item and self.lote:
            raise ValidationError("A saída deve estar vinculada a apenas um item ou um lote, não ambos.")

        if self.lote and self.quantidade <= Decimal('0'):
            raise ValidationError("A quantidade deve ser maior que zero.")

    def __str__(self):
        if self.item:
            return f"Saída de {self.item.nome} ({self.item.codigo})"
        else:
            return f"Saída de {self.lote.nome} ({self.lote.codigo})"

class MovimentacaoEstoque(models.Model):
    TIPO_MOVIMENTACAO = [
        ('entrada', 'Entrada'),
        ('saida', 'Saída'),
        ('emprestimo', 'Empréstimo'),
        ('devolucao', 'Devolução'),
    ]

    item = models.ForeignKey('Item', null=True, blank=True, on_delete=models.PROTECT, related_name='movimentacoes')
    lote = models.ForeignKey('Lote', null=True, blank=True, on_delete=models.PROTECT, related_name='movimentacoes')
    saida = models.ForeignKey('Saida', null=True, blank=True, on_delete=models.PROTECT, related_name='movimentacoes', help_text="Saída que originou esta movimentação, se aplicável.")
    emprestimo = models.ForeignKey('Emprestimo', null=True, blank=True, on_delete=models.PROTECT, related_name='movimentacoes')
    devolucao = models.ForeignKey('Devolucao', null=True, blank=True, on_delete=models.PROTECT, related_name='movimentacoes', help_text="Devolução que originou esta movimentação, se aplicável.")

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
        origem = []
        if self.saida:
            origem.append(f"Saída #{self.saida.id}")
        if self.emprestimo:
            origem.append(f"Empréstimo #{self.emprestimo.id}")
        if self.devolucao:
            origem.append(f"Devolução #{self.devolucao.id}")

        origem_str = f" ({', '.join(origem)})" if origem else ""

        return (
            f"{self.get_tipo_movimentacao_display()} "
            f"de {self.quantidade} ({self.produto_nome}) "
            f"em {self.data_movimentacao:%d/%m/%Y %H:%M}{origem_str}"
        )


