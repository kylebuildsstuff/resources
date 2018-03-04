from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from goals import views


urlpatterns = [
    url(r'^goals/$', views.goals_root, name='goals-root'),
    url(r'^goals/decks/$', views.DeckList.as_view(), name='deck-list'),
    url(r'^goals/decks/(?P<pk>[0-9]+)/$', views.DeckDetail.as_view(), name='deck-detail'),
    url(r'^goals/hands/$', views.HandList.as_view(), name='hand-list'),
    url(r'^goals/hands/(?P<pk>[0-9]+)/$', views.HandDetail.as_view(), name='hand-detail'),
    url(r'^goals/cards/$', views.CardList.as_view(), name='card-list'),
    url(r'^goals/cards/(?P<pk>[0-9]+)/$', views.CardDetail.as_view(), name='card-detail'),
    url(r'^goals/minicards/$', views.MiniCardList.as_view(), name='minicard-list'),
    url(r'^goals/minicards/(?P<pk>[0-9]+)/$', views.MiniCardDetail.as_view(), name='minicard-detail'),
    url(r'^goals/comments/$', views.CommentList.as_view(), name='comment-list'),
    url(r'^goals/comments/(?P<pk>[0-9]+)/$', views.CommentDetail.as_view(), name='comment-detail'),
]
