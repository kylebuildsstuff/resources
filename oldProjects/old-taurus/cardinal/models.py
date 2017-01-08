from django.db import models

TIME_CONSTRAINT_CHOICES = (
    ('daily', 'daily'),
    ('weekly', 'weekly'),
    ('monthly', 'monthly'),
    ('yearly', 'yearly'),
)

REPEATS_CHOICES = (
    ('no', 'no'),
    ('daily', 'daily'),
    ('weekly', 'weekly'),
    ('monthly', 'monthly'),
    ('yearly', 'yearly'),
)


class Goal(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=200, blank=True, default='New goal')
    due_date = models.DateField(null=True, blank=True)
    due_time = models.TimeField(null=True, blank=True)
    all_day = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', related_name='goals')
    repeats = models.CharField(
        choices=REPEATS_CHOICES,
        default='no',
        max_length=100,
    )
    time_constraint = models.CharField(
        choices=TIME_CONSTRAINT_CHOICES,
        default='daily',
        max_length=100,
    )
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ('created',)
