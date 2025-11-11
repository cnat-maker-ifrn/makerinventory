from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from django.utils import timezone
from .models import Item, Lote, Saida, Emprestimo, MovimentacaoEstoque, Devolucao

@receiver(post_save, sender=Item)
def movimentacao_item_criado(sender, instance, created, **kwargs):
    """Cria movimentação de entrada ao cadastrar um novo item unitário."""
    if created:
        MovimentacaoEstoque.objects.create(
            item=instance,
            tipo_movimentacao='entrada',
            quantidade=1,
            data_movimentacao=timezone.now(),
            produto_nome=instance.produto.nome
        )

@receiver(post_save, sender=Lote)
def movimentacao_lote_criado(sender, instance, created, **kwargs):
    """Cria movimentação de entrada ao cadastrar um novo lote."""
    if created:
        MovimentacaoEstoque.objects.create(
            lote=instance,
            tipo_movimentacao='entrada',
            quantidade=instance.quantidade,
            data_movimentacao=timezone.now(),
            produto_nome=instance.produto.nome
        )

@receiver(post_save, sender=Saida)
def movimentacao_saida_criada(sender, instance, created, **kwargs):
    """Cria movimentação de saída ao registrar uma saída de estoque."""
    if created:
        MovimentacaoEstoque.objects.create(
            item=instance.item if instance.item else None,
            lote=instance.lote if instance.lote else None,
            tipo_movimentacao='saida',
            quantidade=instance.quantidade,
            data_movimentacao=timezone.now(),
            produto_nome=(
                instance.item.produto.nome if instance.item
                else instance.lote.produto.nome if instance.lote
                else ''
            )
        )

        if instance.item:
            instance.item.disponibilidade = False
            instance.item.save()

        elif instance.lote:
            if instance.lote.quantidade >= instance.quantidade:
                instance.lote.quantidade -= instance.quantidade
                instance.lote.save()

@receiver(m2m_changed, sender=Emprestimo.itens.through)
def movimentacao_emprestimo_itens(sender, instance, action, pk_set, **kwargs):
    """Cria movimentações e atualiza itens quando são emprestados."""
    if action == "post_add":
        for item_id in pk_set:
            item = Item.objects.get(pk=item_id)

            MovimentacaoEstoque.objects.create(
                item=item,
                tipo_movimentacao='emprestimo',
                quantidade=1,
                data_movimentacao=timezone.now(),
                produto_nome=item.produto.nome
            )

            item.eh_emprestado = True
            item.disponibilidade = False
            item.save()

@receiver(m2m_changed, sender=Devolucao.itens.through)
def movimentacao_devolucao_itens(sender, instance, action, pk_set, **kwargs):
    """Cria movimentações e atualiza status dos itens devolvidos"""
    if action == "post_add":
        for item_id in pk_set:
            item = Item.objects.get(pk=item_id)
            
            MovimentacaoEstoque.objects.create(
                item=item,
                tipo_movimentacao='devolucao',
                quantidade=1,
                data_movimentacao=timezone.now(),
                produto_nome=item.produto.nome,
                devolucao=instance 
            )
            
            item.eh_emprestado = False
            item.disponibilidade = True
            item.save()

