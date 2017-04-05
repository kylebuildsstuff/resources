from django.shortcuts import render

from basics.example.tasks import add


def root(request):
    add.delay(2, 2)
