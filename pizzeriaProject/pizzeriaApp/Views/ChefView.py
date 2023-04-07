from ..Models.Chef import Chef
from ..Serializers.ChefSerializer import ChefSerializer, ChefIdSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from ..Serializers.PizzaSerializer import PizzaSerializer


class ChefDetail(APIView):
    def get(self, request):
        obj = Chef.objects.all()
        serializer = ChefIdSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ChefSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class ChefInfo(APIView):
    def get(self,request,id):
        try:
            obj=Chef.objects.get(id=id)
        except Chef.DoesNotExist:
            msg={"msg":"not found error"}
            return Response(msg, status=status.HTTP_404_NOT_FOUND)
        serializer=ChefSerializer(obj)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def put(self,request,id):
        try:
            obj=Chef.objects.get(id=id)
        except Chef.DoesNotExist:
            msg={"msg":"not found error"}

            return Response(msg,status=status.HTTP_404_NOT_FOUND)
        serializer = ChefSerializer(obj, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    def delete(self,request,id):
        try:
            obj=Chef.objects.get(id=id)
        except Chef.DoesNotExist:
            msg={"msg":"not found error"}
            return Response(msg,status=status.HTTP_404_NOT_FOUND)

        obj.delete()
        return Response({"msg":"delete"},status=status.HTTP_204_NO_CONTENT)


class ChefsWithSalaryBiggerThanN(APIView):
    def get(self,request,n):
        salary=Chef.objects.filter(salary__gte=n)
        serializer=ChefSerializer(salary,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


class AddPizzasToChef(APIView):
    def post(self,request,id):
        pizzas = request.data
        msg = "CREATED"

        for pizza_data in pizzas:
            pizza_data['chef'] = id
            print(pizza_data)
            serializer = PizzaSerializer(data=pizza_data)
            if serializer.is_valid():
                serializer.save()
        return Response(msg, status=status.HTTP_201_CREATED)
