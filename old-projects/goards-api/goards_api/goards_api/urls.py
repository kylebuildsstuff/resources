from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.documentation import include_docs_urls
from rest_framework_jwt.views import obtain_jwt_token

from goards_api import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^docs/', include_docs_urls(title='Goards API', description='RESTful API for Goards')),

    url(r'^$', views.api_root),
    url(r'^', include('auth.urls', namespace='auth')),
    url(r'^', include('users.urls', namespace='users')),
    url(r'^', include('goals.urls', namespace='goals')),
]
