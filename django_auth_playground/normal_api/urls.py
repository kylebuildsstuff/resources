from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns

from normal_api import views


app_name = 'normal_api'
urlpatterns = [
    url(r'^units/$', views.unit_list),
    url(r'^units/(?P<pk>[0-9]+)/$', views.unit_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)
