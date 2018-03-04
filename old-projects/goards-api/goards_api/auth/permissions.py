from rest_framework import permissions


class IsUser(permissions.BasePermission):

    def get_user_from_card(self, card_object):
        if card_object and card_object.user:
            return card_object.user
        return

    def has_object_permission(self, request, view, obj):
        if obj.__str__() == 'MiniCard object':  # MiniCard objects have no 'user' property
            return self.get_user_from_card(obj.card) == request.user
        return obj.user == request.user


class IsUserOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.get_username() == obj.username


class ReadAndPostOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS or request.method == 'POST':
            return True


class IsSuperUserOrPostOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        if request.user:
            return request.user.is_superuser
        return False


class IsSuperUserOrUser(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user:
            if request.user.is_superuser:
                return True
            if request.user.pk == obj.pk:
                return True
        return False
