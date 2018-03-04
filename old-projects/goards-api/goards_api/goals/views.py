from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import IsAuthenticated

from goals.models import Deck, Hand, Card, MiniCard, Comment
from goals.serializers import DeckSerializer, \
                              HandSerializer, CardSerializer, \
                              MiniCardSerializer, CommentSerializer
from auth.permissions import IsUser
from auth.authentications import CustomTokenAuthentication
from exceptions import DeckNotFound, HandNotFound, CardNotFound


@api_view(['GET'])
def goals_root(request, format=None):
    return Response({
       'decks': reverse('goals:deck-list', request=request, format=format),
       'hands': reverse('goals:hand-list', request=request, format=format),
       'cards': reverse('goals:card-list', request=request, format=format),
       'minicards': reverse('goals:minicard-list', request=request, format=format),
       'comments': reverse('goals:comment-list', request=request, format=format),
    })


class DeckList(generics.ListCreateAPIView):
    serializer_class = DeckSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Deck.objects.all().filter(user__pk=self.request.user.pk)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DeckDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DeckSerializer
    permission_classes = (IsUser,)

    def get_queryset(self):
        return Deck.objects.all().filter(user__pk=self.request.user.pk)


class HandList(generics.ListCreateAPIView):
    serializer_class = HandSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Hand.objects.all().filter(user__pk=self.request.user.pk)

    def perform_create(self, serializer):
        deck = None
        try:
            deck = Deck.objects.get(pk=self.request.data.get('deck', {}).get('id', None))
        except Deck.DoesNotExist:
            pass
        if deck:
            serializer.save(
                user=self.request.user,
                deck=deck
            )
        else:
            serializer.save(user=self.request.user)


class HandDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HandSerializer
    permission_classes = (IsUser,)

    def get_queryset(self):
        return Hand.objects.all().filter(user__pk=self.request.user.pk)

    def perform_update(self, serializer):
        updated_deck = None
        try:
            updated_deck = Deck.objects.get(pk=self.request.data.get('updated_deck', {}).get('id', None))
        except Deck.DoesNotExist:
            pass
        if updated_deck:
            serializer.save(deck=updated_deck)
        else:
            serializer.save()


class CardList(generics.ListCreateAPIView):
    serializer_class = CardSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Card.objects.all().filter(user__pk=self.request.user.pk)

    def perform_create(self, serializer):
        hand = None
        try:
            hand = Hand.objects.get(pk=self.request.data.get('hand', {}).get('id', None))
        except Hand.DoesNotExist:
            pass
        if hand:
            serializer.save(
                user=self.request.user,
                hand=hand
            )
        else:
            serializer.save(user=self.request.user)


class CardDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CardSerializer
    permission_classes = (IsUser,)

    def get_queryset(self):
        return Card.objects.all().filter(user__pk=self.request.user.pk)

    def perform_update(self, serializer):
        updated_hand = None
        try:
            updated_hand = Hand.objects.get(pk=self.request.data.get('updated_hand', {}).get('id', None))
        except Hand.DoesNotExist:
            pass
        if updated_hand:
            serializer.save(hand=updated_hand)
        else:
            serializer.save()


class MiniCardList(generics.ListCreateAPIView):
    serializer_class = MiniCardSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return MiniCard.objects.all().filter(card__user__pk=self.request.user.pk)

    def perform_create(self, serializer):
        card = None
        try:
            card = Card.objects.get(pk=self.request.data.get('card', {}).get('id', None))
        except Card.DoesNotExist as e:
            raise CardNotFound()
        serializer.save(card=card)


class MiniCardDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MiniCardSerializer
    permission_classes = (IsUser,)

    def get_queryset(self):
        return MiniCard.objects.all().filter(card__user__pk=self.request.user.pk)

    def perform_update(self, serializer):
        card = None
        try:
            card = Card.objects.get(pk=self.request.data.get('card', {}).get('id', None))
        except Card.DoesNotExist:
            pass
        if card:
            serializer.save(card=card)
        else:
            serializer.save()


class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Comment.objects.all().filter(user__pk=self.request.user.pk)

    def perform_create(self, serializer):
        card = None
        try:
            card = Card.objects.get(pk=self.request.data.get('card', {}).get('id', None))
        except Card.DoesNotExist as e:
            raise CardNotFound()
        serializer.save(card=card, user=self.request.user)


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    # permission_classes = (IsUser,)

    def get_queryset(self):
        return Comment.objects.all().filter(card__user__pk=self.request.user.pk)

    def perform_update(self, serializer):
        card = None
        try:
            card = Card.objects.get(pk=self.request.data.get('card', {}).get('id', None))
        except Card.DoesNotExist:
            pass
        if card:
            serializer.save(card=card)
        else:
            serializer.save()
