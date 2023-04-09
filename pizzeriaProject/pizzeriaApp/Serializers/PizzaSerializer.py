from rest_framework import serializers

from .OrderSerializer import OrderSerializer
from ..Models.Chef import Chef
from ..Models.Pizza import Pizza


class PizzaSerializer(serializers.ModelSerializer):
    sort = serializers.CharField(max_length=50)
    sauce = serializers.CharField(max_length=50)
    price = serializers.FloatField()
    weight = serializers.IntegerField()
    chef=Chef()
    orders=OrderSerializer(many=True,read_only=True)

    order_count=serializers.SerializerMethodField()
    chef_id=serializers.IntegerField(write_only=True)

    def validate_chef_id(self,value):
        filter = Chef.objects.filter(id=value)
        if not filter.exists():
            raise serializers.ValidationError("Chef does not exist")
        return value

    def get_order_count(self,obj):
        # return obj.orders.annotate(order_count=Count('id')).aggregate(Sum('order_count'))['order_count__sum']
        return obj.orders.count()

    class Meta:
        model= Pizza
        fields = "__all__"


class PizzaIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pizza
        fields = ("id", )

