from django.http import Http404
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from rest_framework import status, generics, permissions, renderers, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.decorators import api_view
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

import cardinal
from cardinal.models import Goal
from cardinal.permissions import IsOwnerOrReadOnly, IsOwner, IsUser
from cardinal.authentications import CsrfExemptSessionAuthentication
from cardinal.serializers import GoalSerializer, UserSerializer

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'goals': reverse('goal-list', request=request, format=format),
    })


class GoalList(generics.ListCreateAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (cardinal.permissions.IsOwner,)

    def perform_create(self, serializer):
        user_to_get = User.objects.get(pk=self.request.data.get('jwt').get('user_id'))
        serializer.save(owner=user_to_get)


class GoalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    authentication_classes = (JSONWebTokenAuthentication,)
    permission_classes = (cardinal.permissions.IsOwner,)


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,)
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (CsrfExemptSessionAuthentication,
                              JSONWebTokenAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsUser,)


# class TaskList(APIView):
#     """
#     List all tasks.
#     """
#     permissions_classes = (permissions.IsAuthenticatedOrReadOnly,
#                            IsOwnerOrReadOnly,)
#
#     def get(self, request, format=None):
#         tasks = Task.objects.all()
#         serializer = TaskSerializer(tasks, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = TaskSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)
#
#
# class TaskDetail(APIView):
#     """
#     View a single task.
#     """
#     print("Hit VIEW TaskDetail")
#     permissions_classes = (IsUser,)
#
#     def get_object(self, pk):
#         try:
#             return Task.objects.get(pk=pk)
#         except Task.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         task = self.get_object(pk)
#         serializer = TaskSerializer(task)
#         return Response(serializer.data)
#
#     def put(self, request, pk, format=None):
#         task = self.get_object(pk)
#         serializer = TaskSerializer(task, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         task = self.get_object(pk)
#         task.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
#

# class UserList(mixins.ListModelMixin,
#                mixins.CreateModelMixin,
#                generics.GenericAPIView):
#
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)
#
#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
#
#
# class UserDetail(mixins.RetrieveModelMixin,
#                  mixins.UpdateModelMixin,
#                  mixins.DestroyModelMixin,
#                  generics.GenericAPIView):
#
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
#
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
#
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)


# class UserList(APIView):
#
#     def get(self, request, format=None):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserDetail(APIView):
#
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly,
#                           IsUser,)
#
#     def get_object(self, pk):
#         try:
#             return User.objects.get(pk=pk)
#         except User.DoesNotExist:
#             raise Http404
#
#     def get(self, request, pk, format=None):
#         user = self.get_object(pk)
#         serializer = UserSerializer(user, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def put(self, request, pk, format=None):
#         user = self.get_object(pk)
#         serializer = UserSerializer(snippet, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, pk, format=None):
#         user = self.get_object(pk)
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)
