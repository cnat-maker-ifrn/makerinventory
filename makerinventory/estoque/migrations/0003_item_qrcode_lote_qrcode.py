# Generated migration to add qrcode field to Item and Lote models

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estoque', '0002_alter_user_managers'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='qrcode',
            field=models.ImageField(blank=True, null=True, upload_to='img/qrcodes/itens'),
        ),
        migrations.AddField(
            model_name='lote',
            name='qrcode',
            field=models.ImageField(blank=True, null=True, upload_to='img/qrcodes/lotes'),
        ),
    ]
