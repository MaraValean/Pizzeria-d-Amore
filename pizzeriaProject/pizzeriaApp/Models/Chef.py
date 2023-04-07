from django.db import models


class Chef(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    salary = models.IntegerField()
    seniority = models.IntegerField()
    shift = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
