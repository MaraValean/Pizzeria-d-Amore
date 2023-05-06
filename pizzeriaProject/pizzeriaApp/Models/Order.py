from datetime import datetime

from django.db import models

from .Pizza import Pizza


class Order(models.Model):
    total_amount =models.FloatField()
    payment_method = models.CharField(max_length=10)
    table = models.IntegerField()
    status = models.CharField(max_length=50)
    time = models.DateTimeField(default=datetime.now())
    pizzas=models.ManyToManyField(Pizza, through='PizzaOrder')

    def __str__(self):
        return f"{self.total_amount} tip at table {self.table}"
