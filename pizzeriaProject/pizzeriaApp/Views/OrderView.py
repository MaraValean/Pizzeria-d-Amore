from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from ..Models.Order import Order
from ..Serializers.OrderSerializer import OrderIdSerializer, OrderSerializer

from django.db.models import Avg, Count, OuterRef, Subquery, Q, Case, When


class OrderDetail(APIView):
    serializer_class = OrderSerializer

    def get(self, request):
        obj = Order.objects.all()
        serializer = OrderSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class OrderInfo(APIView):
    serializer_class = OrderSerializer

    def get(selfself,request,id):
        try:
            obj=Order.objects.get(id=id)
        except Order.DoesNotExist:
            msg={"msg":"not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)
        serializer=OrderSerializer(obj)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,id):
        try:
            obj=Order.objects.get(id=id)
        except Order.DoesNotExist:
            msg={"msg":"not found error"}

            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serializer = OrderSerializer(obj, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,id):
        try:
            obj=Order.objects.get(id=id)
        except Order.DoesNotExist:
            msg={"msg":"not found error"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg":"delete"},status=status.HTTP_204_NO_CONTENT)


class OrdersByAvgPizzaWeight(generics.ListAPIView):
    serializer_class=OrderSerializer

    def get_queryset(self):
        query=Order.objects.annotate(avg_weight=Avg('pizzas__weight')).order_by('avg_weight')
        print(query.query)
        return query
