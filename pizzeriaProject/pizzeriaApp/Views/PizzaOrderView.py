from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from ..Models.PizzaOrder import PizzaOrder
from ..Serializers.PizzaOrderSerializer import PizzaOrderSerializer


class PizzaOrderDetail(APIView):
    serializer_class = PizzaOrderSerializer

    def get(self, request):
        obj = PizzaOrder.objects.all()
        serializer = PizzaOrderSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PizzaOrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class PizzaOrderInfo(APIView):
    serializer_class = PizzaOrderSerializer

    def get(selfself, request, id):
        try:
            obj = PizzaOrder.objects.get(id=id)
        except PizzaOrder.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)
        serializer = PizzaOrderSerializer(obj)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        try:
            obj = PizzaOrder.objects.get(id=id)
        except PizzaOrder.DoesNotExist:
            msg = {"msg": "not found error"}

            return Response(msg, status=status.HTTP_404_NOT_FOUND)
        serializer = PizzaOrderSerializer(obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            obj = PizzaOrder.objects.get(id=id)
        except PizzaOrder.DoesNotExist:
            msg = {"msg": "not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg": "delete"}, status=status.HTTP_204_NO_CONTENT)

