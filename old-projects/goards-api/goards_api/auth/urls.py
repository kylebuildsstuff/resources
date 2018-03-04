from django.conf.urls import url, include
from auth import views


urlpatterns = [
    url(r'^verify/$', views.VerifyJSONWebToken.as_view(), name="verify"),
    url(r'^refresh/$', views.RefreshJSONWebToken.as_view(), name="refresh"),
    url(r'^token/$', views.ObtainJSONWebToken.as_view(), name="token"),
]
