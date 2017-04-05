from django.contrib.auth.models import User
from rest_framework import serializers
from cardinal.models import Goal, TIME_CONSTRAINT_CHOICES


class GoalSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Goal
        fields = ('url', 'created', 'title', 'due_date',
                  'due_time', 'all_day', 'owner', 'repeats', 'time_constraint', 'notes')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    goals = serializers.HyperlinkedRelatedField(many=True, view_name='goal-detail', read_only=True)

    class Meta:
        model = User
        fields = ('url', 'username', 'password', 'goals')

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
