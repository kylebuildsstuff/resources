from rest_framework import serializers

from goals.models import Deck, Hand, Card, MiniCard, Comment


class MiniCardSerializer(serializers.HyperlinkedModelSerializer):
    card = serializers.CharField(read_only=True, required=False, source='card.name')

    class Meta:
        model = MiniCard
        fields = ('url', 'id', 'card', 'created', 'is_completed', 'name')
        extra_kwargs = {
            'url': {
                'view_name': 'goals:minicard-detail',
            }
        }


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    card = serializers.CharField(read_only=True, required=False, source='card.name')
    user = serializers.CharField(read_only=True, source='user.username')

    class Meta:
        model = Comment
        fields = ('url', 'id', 'card', 'comment', 'user', 'edited_date')
        extra_kwargs = {
            'url': {
                'view_name': 'goals:comment-detail',
            }
        }


class CardSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.CharField(read_only=True, source='user.username')
    hand = serializers.CharField(read_only=True, required=False, source='hand.name')
    minicards = MiniCardSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Card
        fields = ('url', 'id', 'created',
                  'completion_date', 'due_date', 'hand',
                  'importance_level', 'is_completed', 'name',
                  'reminder_date', 'user', 'minicards',
                  'comments')
        extra_kwargs = {
            'url': {
                'view_name': 'goals:card-detail',
            }
        }


class HandSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.CharField(read_only=True, source='user.username')
    deck = serializers.CharField(read_only=True, required=False, source='deck.name')
    cards = CardSerializer(many=True, read_only=True)

    class Meta:
        model = Hand
        fields = ('url', 'id', 'created',
                  'deck', 'name', 'user', 'cards')
        extra_kwargs = {
            'url': {
                'view_name': 'goals:hand-detail',
            }
        }


class DeckSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.CharField(read_only=True, source='user.username')
    hands = HandSerializer(many=True, read_only=True)

    class Meta:
        model = Deck
        fields = ('url', 'id', 'created', 'name', 'user', 'hands')
        extra_kwargs = {
            'url': {
                'view_name': 'goals:deck-detail',
            }
        }
