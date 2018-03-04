from django.db import models
from users.models import User


class Deck(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    user = models.ForeignKey('users.User', related_name='decks', on_delete=models.CASCADE, null=False)

    class Meta:
        ordering = ('created',)


class Hand(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=False, null=False)
    user = models.ForeignKey('users.User', related_name='hands', on_delete=models.CASCADE, null=False)
    deck = models.ForeignKey('goals.Deck', related_name='hands', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('created',)


class Card(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    completion_date = models.DateTimeField(blank=True, null=True)
    due_date = models.DateTimeField(blank=True, null=True)
    importance_level = models.SmallIntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    name = models.CharField(max_length=200, blank=False, null=False)
    reminder_date = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey('users.User', related_name='cards', on_delete=models.CASCADE, null=False)
    hand = models.ForeignKey('goals.Hand', related_name='cards', on_delete=models.CASCADE, null=True)

    class Meta:
        ordering = ('created',)


class MiniCard(models.Model):
    card = models.ForeignKey('goals.Card', related_name='minicards', on_delete=models.CASCADE, null=False)
    created = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    name = models.CharField(max_length=200, blank=False, null=False)


class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    edited_date = models.DateTimeField(null=True)
    comment = models.CharField(max_length=1000, blank=False, null=False)
    user = models.ForeignKey('users.User', related_name='comments', on_delete=models.CASCADE, null=False)
    card = models.ForeignKey('goals.Card', related_name='comments', on_delete=models.CASCADE, null=False)
