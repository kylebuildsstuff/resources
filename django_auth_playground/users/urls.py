from django.conf.urls import url, include

from users import views


app_name = 'users'
urlpatterns = [
    url(r'^$', views.index, name='index'),
]
