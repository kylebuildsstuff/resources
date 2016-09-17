from django.db import models


class Unit(models.Model):
    FACTION_CHOICES = (
        ('N', 'Neutral'),
        ('P', 'Protoss'),
        ('Z', 'Zerg'),
        ('T', 'Terran'),
    )

    TIER_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
    )

    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, default='', blank=True, null=True)
    attack = models.IntegerField(default=1, blank=True, null=True)
    defence = models.IntegerField(default=1, blank=True, null=True)
    health = models.IntegerField(default=1, blank=True, null=True)
    tier = models.IntegerField(choices=TIER_CHOICES, default=1, blank=True, null=True)
    faction = models.CharField(max_length=1, choices=FACTION_CHOICES, default='N', blank=True, null=True)
    description = models.TextField()

    class Meta:
        ordering = ('-attack',)

    def __str__(self):
        return "Tier {0} {1} {2}".format(self.tier, self.faction, self.name)
