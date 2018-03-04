from rest_framework import serializers

from users.models import User
from goals.serializers import DeckSerializer, HandSerializer, CardSerializer, CommentSerializer


class BaseUserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User()
        for field in validated_data:
            if field == 'password':
                user.set_password(validated_data.get('password', None))
            else:
                user.__setattr__(field, validated_data.get(field))
        user.save()
        return user

    def update(self, instance, validated_data):
        for field in validated_data:
            if field == 'password':
                instance.set_password(validated_data.get(field))
            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('url', 'id', 'username',
                  'password', 'first_name', 'last_name',
                  'email')
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            }
        }


class UserSerializer(BaseUserSerializer):
    # decks = DeckSerializer(many=True, read_only=True)
    # hands = HandSerializer(many=True, read_only=True)
    # cards = CardSerializer(many=True, read_only=True)
    # comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('url', 'id', 'username',
                  'password', 'first_name', 'last_name',
                  'email'
                  )
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            }
        }
