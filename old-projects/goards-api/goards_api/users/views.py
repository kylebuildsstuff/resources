from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from users.models import User
from users.serializers import UserSerializer
from auth.permissions import IsUserOrReadOnly, ReadAndPostOnly, IsSuperUserOrPostOnly, IsSuperUserOrUser


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsSuperUserOrPostOnly,)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsSuperUserOrUser,)
