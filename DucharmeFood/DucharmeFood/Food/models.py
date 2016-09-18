from django.db import models
from django.template.defaultfilters import slugify
from django.contrib.auth.models import User
import datetime

class Meal(models.Model):
    mealtype = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.mealtype

class MealItem(models.Model):
    meal = models.ForeignKey(Meal)
    name = models.CharField(max_length=128)
    price = models.FloatField(default=0)
    proteins = models.FloatField(default=0)
    carbs = models.FloatField(default=0)
    fats = models.FloatField(default=0)
    ingredients = models.CharField(max_length=500)
    description = models.CharField(max_length=500)
    picture = models.ImageField(upload_to='meals', blank=True)

    def __str__(self):
        return self.name

class ContentEditer(models.Model):
    section = models.CharField(max_length=128)
    text = models.TextField()
    picture = models.ImageField(upload_to='meals', blank=True)

    def __str__(self):
        return self.section
