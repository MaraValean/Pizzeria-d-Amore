from ..Views.Pagination import CustomPagination
from ..Models.Pizza import Pizza
from ..Serializers.PizzaSerializer import PizzaSerializer, PizzaIdSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics
from django.db.models import Avg, Count, OuterRef, Subquery, Q, Case, When


class PizzaDetail(APIView):
    serializer_class = PizzaSerializer
    pagination_class = CustomPagination

    def get(self,request):
        obj = Pizza.objects.all()
        serializer = PizzaSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self,request):
        serializer = PizzaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class PizzaInfo(APIView):
    serializer_class = PizzaSerializer

    def get(self,request,id):
        try:
            obj=Pizza.objects.get(id=id)
        except Pizza.DoesNotExist:
            msg={"msg":"not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)
        serializer=PizzaSerializer(obj)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,id):
        try:
            obj=Pizza.objects.get(id=id)
        except Pizza.DoesNotExist:
            msg={"msg":"not found error"}

            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serializer = PizzaSerializer(obj, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,id):
        try:
            obj=Pizza.objects.get(id=id)
        except Pizza.DoesNotExist:
            msg={"msg":"not found error"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg":"delete"},status=status.HTTP_204_NO_CONTENT)


class MostOrderedPizza(generics.ListAPIView):
    serializer_class = PizzaSerializer

    def get_queryset(self):
        query=Pizza.objects.annotate(order_count=Count('orders__pizza')).order_by('-order_count')[:3]
        return query
