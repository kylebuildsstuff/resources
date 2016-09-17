from django.shortcuts import render, HttpResponse


def index(request):
    return HttpResponse("this is the users app index.")
