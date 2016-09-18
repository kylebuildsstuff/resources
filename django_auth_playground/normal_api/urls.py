from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns

from normal_api import views


# app_name = 'normal_api'
urlpatterns = [
    url(r'^$', views.api_root),
    url(r'^users/$', views.UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^units/$', views.UnitList.as_view(), name='unit-list'),
    url(r'^units/(?P<pk>[0-9]+)/$', views.UnitDetail.as_view(), name='unit-detail'),
]

# @NOTE: for (1) basic function-based views
# urlpatterns = [
#     url(r'^units/$', views.unit_list),
#     url(r'^units/(?P<pk>[0-9]+)/$', views.unit_detail),
# ]

urlpatterns = format_suffix_patterns(urlpatterns)
