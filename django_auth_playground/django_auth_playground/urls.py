from django.conf.urls import url, include
from django.contrib import admin

from users import urls as users_urls
from normal_api import urls as normal_api_urls


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^users/', include(users_urls)),
    url(r'^normal_api/', include(normal_api_urls)),
    url(r'^', include(normal_api_urls)),
]
