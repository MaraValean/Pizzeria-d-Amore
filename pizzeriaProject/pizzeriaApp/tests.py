from django.test import TestCase

from rest_framework.test import APIClient
from django.urls import reverse
# Create your tests here.
from pizzeriaProject.pizzeriaApp.Models.Chef import Chef
from pizzeriaProject.pizzeriaApp.Models.Order import Order
from pizzeriaProject.pizzeriaApp.Models.Pizza import Pizza


class ViewTest(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.chef1=Chef.objects.create( first_name ="John1",last_name ="Doe",salary = 1000,seniority = 1,shift = "shift1")
        self.chef2=Chef.objects.create( first_name ="John2",last_name ="Doe",salary = 2000,seniority = 2,shift = "shift2")

        self.order1 = Order.objects.create(total_amount=10,payment_method = "cash",table = 1,status ="processed",time="2023-03-19T21:32:57.863586Z")
        self.order2 = Order.objects.create(total_amount=20,payment_method = "cash",table = 2,status ="processed",time="2023-03-19T21:32:57.863586Z")
        self.pizza1 = Pizza.objects.create( sort ="pizza1",sauce = "1",price = 10,chef = self.chef1,weight =1000)
        self.pizza2=Pizza.objects.create( sort ="pizza2",sauce = "2",price = 20,chef = self.chef2,weight =200)
        self.order1.pizzas.add(self.pizza1)
        self.order2.pizzas.add(self.pizza2)

        self.chef3 = Chef.objects.create(first_name="Jane1", last_name="Doe", salary=1500, seniority=3, shift="shift1")
        self.chef4 = Chef.objects.create(first_name="Jane2", last_name="Doe", salary=2500, seniority=4, shift="shift2")

        self.order3 = Order.objects.create(total_amount=30, payment_method="credit", table=3, status="processed",time="2023-03-19T21:32:57.863586Z")
        self.order4 = Order.objects.create(total_amount=40, payment_method="credit", table=4, status="processed",time="2023-03-19T21:32:57.863586Z")

        self.pizza3 = Pizza.objects.create(sort="pizza3", sauce="3", price=30, chef=self.chef3, weight=3000)
        self.pizza4 = Pizza.objects.create(sort="pizza4", sauce="4", price=40, chef=self.chef4, weight=400)

        self.order3.pizzas.add(self.pizza3)
        self.order3.pizzas.add(self.pizza4)
        self.order2.pizzas.add(self.pizza4)

        self.pizza5 = Pizza.objects.create(sort="pizza4", sauce="3", price=15, chef=self.chef1, weight=500)

    def test_OrdersByAvgWeight(self):
        url=reverse('order_avg_pizza_weight')
        response=self.client.get(url)


        self.assertEqual(response.status_code,200)
        self.assertEqual(response.json(), [ {"id": self.order4.id,"avg_weight":None, "total_amount": 40.0, "payment_method": "credit",
                                             "table": 4, "status": "processed","time":"2023-03-19T21:32:57.863586Z","pizzas":[]},
                                            {"id": self.order2.id,"avg_weight":300.0, "total_amount": 20.0, "payment_method": "cash",
                                             "table": 2, "status": "processed","time":"2023-03-19T21:32:57.863586Z","pizzas":[2,4]},
                                            {"id": self.order1.id,"avg_weight":1000.0, "total_amount": 10.0, "payment_method": "cash",
                                             "table": 1, "status": "processed","time":"2023-03-19T21:32:57.863586Z","pizzas":[1]},
                                           {"id": self.order3.id,"avg_weight":1700.0, "total_amount": 30.0, "payment_method": "credit",
                                             "table": 3, "status": "processed","time":"2023-03-19T21:32:57.863586Z","pizzas":[3,4]}])

    def test_MostOrderedPizza(self):
        url = reverse('pizza_most_ordered')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 3)
        self.assertEqual(response.json(),[ {"id":self.pizza4.id,"sort":"pizza4","sauce":"4","price":40.0,"weight":400,"order_count":2,"chef":4,"orders":[3,2]},
                                           {"id":self.pizza2.id,"sort":"pizza2","sauce":"2","price":20.0,"weight":200,"order_count":1,"chef":2,"orders":[2]},
                                           {"id":self.pizza3.id,"sort":"pizza3","sauce":"3","price":30.0,"weight":3000,"order_count":1,"chef":3,"orders":[3]}])


