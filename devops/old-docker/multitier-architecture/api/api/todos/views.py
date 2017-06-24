from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

from todos.models import Todo
from todos.serializers import TodoSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'todos': reverse('todos:todo-list', request=request, format=format),
    })


class TodoList(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()


class TodoDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
