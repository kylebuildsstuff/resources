from django.conf.urls import url, include

from blog_app import views


urlpatterns = [
    url(r'^', views.index, name='index'),
]