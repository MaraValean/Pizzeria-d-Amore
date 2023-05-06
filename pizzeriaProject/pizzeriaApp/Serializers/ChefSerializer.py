from rest_framework import serializers

from ..Models.Chef import Chef
from ..Serializers.PizzaSerializer import PizzaIdSerializer, PizzaSerializer


class ChefSerializer(serializers.ModelSerializer):
    pizzas=PizzaSerializer(many=True,read_only=True)
    class Meta:
        model = Chef
        fields = "__all__"


class ChefIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chef
        fields = ("id", )