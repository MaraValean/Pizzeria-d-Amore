from rest_framework import serializers

from ..Models.Order import Order


class OrderSerializer(serializers.ModelSerializer):
    avg_weight = serializers.FloatField(read_only=True)
    class Meta:
        model= Order
        fields = "__all__"


class OrderIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("id", )
