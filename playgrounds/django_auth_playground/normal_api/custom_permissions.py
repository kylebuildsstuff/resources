from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        from IPython import embed; embed()
        # if request.method in permissions.SAFE_METHODS:
        #     return True
        # print("NO")
        print("WHASDSA")
        return True
        # return obj.owner == request.user

class HasUserAndAuthOnRequest(permissions.BasePermission):
    def has_permission(self, request, view):
        print("")
        print("dir(self): ", dir(self))
        print("")
        print("dir(request): ", dir(request))
        print("")
        print("view: ", view)
        print("")
        # print("obj: ",)
        print("")
        return False
