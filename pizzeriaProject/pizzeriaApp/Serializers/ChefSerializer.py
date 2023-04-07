from rest_framework import serializers

from ..Models.Chef import Chef
from ..Serializers.PizzaSerializer import PizzaIdSerializer


class ChefSerializer(serializers.ModelSerializer):
    pizzas=PizzaIdSerializer(many=True,read_only=True)
    class Meta:
        model = Chef
        fields = ('id','first_name','last_name','pizzas')


class ChefIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chef
        fields = ("id", )