from django.shortcuts import render, HttpResponse


def index(request):
    return HttpResponse("This is the normal_api app index")
