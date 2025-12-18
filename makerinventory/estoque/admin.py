from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import *

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
admin.site.register(Devolucao)

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("matricula", "nome")

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = "__all__"

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User

    list_display = ("matricula", "nome", "is_staff", "is_active")
    list_filter = ("is_staff", "is_superuser", "is_active")

    fieldsets = (
        (None, {"fields": ("matricula", "password")}),
        ("Informações pessoais", {"fields": ("nome",)}),
        ("Permissões", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Datas importantes", {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("matricula", "nome", "password1", "password2", "is_staff", "is_superuser"),
        }),
    )

    search_fields = ("matricula", "nome")
    ordering = ("matricula",)

