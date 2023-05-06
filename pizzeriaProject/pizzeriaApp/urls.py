from django.urls import path

from .Views.ChefView import ChefDetail, ChefInfo, ChefsWithSalaryBiggerThanN, AddPizzasToChef, ChefViewForAutocomplete
from .Views.OrderView import OrderDetail, OrderInfo, OrdersByAvgPizzaWeight
from .Views.PizzaOrderView import PizzaOrderDetail, PizzaOrderInfo
from .Views.PizzaView import PizzaDetail, PizzaInfo, MostOrderedPizza

urlpatterns=[
    path("pizza/",PizzaDetail.as_view(), name="pizza"),
    path("pizza/<int:id>/",PizzaInfo.as_view()),
    path("chef/",ChefDetail.as_view(), name="chef"),
    path("chef/<int:id>/",ChefInfo.as_view()),
    path("order/",OrderDetail.as_view(), name="order"),
    path("order/<int:id>/",OrderInfo.as_view()),
    path("filterSalary/<int:n>/",ChefsWithSalaryBiggerThanN.as_view(),name="chef_filter_salary"),
    path("pizzaOrder/",PizzaOrderDetail.as_view(),name="pizzaOrder"),
    path("pizzaOrder/<int:id>/",PizzaOrderInfo.as_view()),
    path("order/avgPizzaWeight/",OrdersByAvgPizzaWeight.as_view(),name='order_avg_pizza_weight'),
    path("pizza/mostOrdered/",MostOrderedPizza.as_view(),name='pizza_most_ordered'),
    path("chef/<int:id>/pizzas/",AddPizzasToChef.as_view()),
    path("chef/autocomplete/", ChefViewForAutocomplete.as_view()),

]
