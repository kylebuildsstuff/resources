from django.contrib.auth.models import User
from rest_framework import serializers

from normal_api.models import Unit


class UnitSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Unit
        fields = ('url', 'pk', 'created', 'name', 'attack', 'defence', 'health', 'tier', 'faction', 'description', 'owner',)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    units = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='unit-detail',
        read_only=True
    )

    class Meta:
        model = User
        fields = ('url', 'pk', 'username', 'units')



# class UnitSerializer(serializers.Serializer):
#     pk = serializers.IntegerField(read_only=True)
#     name = serializers.CharField()
#     attack = serializers.IntegerField(default=1)
#     defence = serializers.IntegerField(default=1)
#     health = serializers.IntegerField(default=1)
#     tier = serializers.ChoiceField(choices=Unit.TIER_CHOICES, default=1)
#     faction = serializers.ChoiceField(choices=Unit.FACTION_CHOICES, default='N')
#     description = serializers.CharField()
#
#     def create(self, validated_data):
#         return Unit.objects.create(**validated_data)
#
#     def update(self, instance, validated_data):
#         instance.name = validated_data.get('name', instance.name)
#         instance.attack = validated_data.get('attack', instance.attack)
#         instance.defence = validated_data.get('defence', instance.defence)
#         instance.health = validated_data.get('health', instance.health)
#         instance.tier = validated_data.get('tier', instance.tier)
#         instance.faction = validated_data.get('faction', instance.faction)
#         instance.description = validated_data.get('description', instance.description)
#
#         return instance
