from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from cardinal import views

urlpatterns = [
    url(r'^$', views.api_root),
    url(r'^users/$', views.UserList.as_view(), name='user-list'),
    url(r'^users/(?P<pk>[0-9]+)$', views.UserDetail.as_view(), name='user-detail'),
    url(r'^goals/$', views.GoalList.as_view(), name='goal-list'),
    url(r'^goals/(?P<pk>[0-9]+)$', views.GoalDetail.as_view(), name='goal-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)