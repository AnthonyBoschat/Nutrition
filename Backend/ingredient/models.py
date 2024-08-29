from django.db import models




# Le modèle principal
class Ingredient(models.Model):
    # Ce qui défini ce modèle
    range = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    calorie = models.FloatField(default=0.0)
    weight = models.FloatField(default=0.0)
    protein = models.FloatField(default=0.0)
    glucid = models.FloatField(default=0.0)
    lipid = models.FloatField(default=0.0)

    # Nom de l'instance de ce modèle
    def __str__(self):
        return self.name