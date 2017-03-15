from django.conf.urls import url

from basics.example import views


urlpatterns = [
    url(r'^root/', views.root),
]
