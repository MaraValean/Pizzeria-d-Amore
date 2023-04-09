from ..Models.Chef import Chef
from ..Serializers.ChefSerializer import ChefSerializer, ChefIdSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, generics

from ..Serializers.PizzaSerializer import PizzaSerializer


class ChefDetail(APIView):
    serializer_class = ChefSerializer

    def get(self, request):
        obj = Chef.objects.all()
        serializer = ChefSerializer(obj, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ChefSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


class ChefInfo(APIView):
    serializer_class = ChefSerializer
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
    serializer_class = ChefSerializer

    def get(self,request,n):
        salary=Chef.objects.filter(salary__gte=n)
        serializer=ChefSerializer(salary,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


class AddPizzasToChef(APIView):
    serializer_class = ChefSerializer

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

class ChefViewForAutocomplete(APIView):
    serializer_class = ChefSerializer

    def get(self, request, *args, **kwargs):

        query = request.GET.get('query')
        # TODO: leverage full text search (using a raw query if needed)
        # for example in postgres:
        # SELECT * FROM teacher WHERE to_tsvector(name) @@ to_tsquery(query)
        chefs = Chef.objects.filter(name__icontains=query).order_by('first_name')[:20]
        serializer = ChefSerializer(chefs, many=True)
        return Response(serializer.data)