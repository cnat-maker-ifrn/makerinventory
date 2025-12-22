from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):
    """
    Permissão para operações de leitura (GET) para qualquer um (autenticado ou não).
    Operações de escrita (POST, PUT, DELETE) apenas para usuários autenticados (staff ou não).
    """
    def has_permission(self, request, view):
        # Permite GET para qualquer um
        if request.method in SAFE_METHODS:
            return True

        # Permite POST, PUT, DELETE apenas para usuários autenticados
        return request.user and request.user.is_authenticated


class IsAuthenticatedOrReadOnly(BasePermission):
    """
    Permissão para operações de leitura (GET) para qualquer um (autenticado ou não).
    Operações de escrita (POST, PUT, DELETE) apenas para usuários autenticados.
    """
    def has_permission(self, request, view):
        # Permite GET para qualquer um
        if request.method in SAFE_METHODS:
            return True

        # Permite POST, PUT, DELETE apenas para usuários autenticados
        return request.user and request.user.is_authenticated
