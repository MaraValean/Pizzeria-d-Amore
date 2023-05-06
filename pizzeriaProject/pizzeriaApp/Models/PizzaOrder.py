
from django.db import models

from .Order import Order
from .Pizza import Pizza


class PizzaOrder(models.Model):
    pizza = models.ForeignKey(Pizza,on_delete=models.CASCADE)
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    waiter=models.CharField(max_length=50)
    instructions = models.CharField(max_length=50,default='none')

    def __str__(self):
        return f"{self.pizza} included in order {self.order}"
