from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    url(r'^snippets/$', views.snippet_list.as_view()),
    url(r'^snippets/(?P<pk>[0-9]+)/$', views.snippet_detail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)