from rest_framework import serializers

from ..Models.Order import Order
from ..Models.Pizza import Pizza
from ..Models.PizzaOrder import PizzaOrder


class PizzaOrderSerializer(serializers.ModelSerializer):
    instructions=serializers.CharField(max_length=50)
    waiter=serializers.CharField(max_length=50)
    order=Order()
    pizza=Pizza()
    order_id=serializers.IntegerField(write_only=True)
    pizza_id=serializers.IntegerField(write_only=True)

    def validate_order_id(self,value):
        filter = Order.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Order does not exist")
        return value

    def validate_pizza_id(self, value):
        filter = Pizza.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Pizza does not exist")
        return value

    class Meta:
        model=PizzaOrder
        fields="__all__"


class PizzaOrderIdSerializer(serializers.ModelSerializer):

    class Meta:
        model=PizzaOrder
        fields=("id", )
