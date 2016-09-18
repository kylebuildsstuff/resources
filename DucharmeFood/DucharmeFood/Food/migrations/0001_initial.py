# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('mealtype', models.CharField(max_length=128, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='MealItem',
            fields=[
                ('id', models.AutoField(auto_created=True, serialize=False, verbose_name='ID', primary_key=True)),
                ('name', models.CharField(max_length=128)),
                ('ingredients', models.CharField(max_length=500)),
                ('description', models.CharField(max_length=500)),
                ('picture', models.ImageField(blank=True, upload_to='meals')),
                ('meal', models.ForeignKey(to='Food.Meal')),
            ],
        ),
    ]
