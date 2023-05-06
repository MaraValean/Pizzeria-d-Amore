from django.db import models

from .Chef import Chef


class Pizza(models.Model):
    sort = models.CharField(max_length=50)
    sauce = models.CharField(max_length=50, default=None)
    price = models.FloatField()
    chef = models.ForeignKey(Chef, on_delete=models.CASCADE, related_name='pizzas')
    weight = models.IntegerField()
    calories = models.IntegerField()

    orders=models.ManyToManyField('Order',through='PizzaOrder')

    def __str__(self):
        return self.sort