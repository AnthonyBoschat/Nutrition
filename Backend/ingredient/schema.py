import graphene
from graphene_django.types import DjangoObjectType
from .models import Ingredient  # Importer le modèle


class IngredientInformationsType(graphene.ObjectType):
    calorie = graphene.Float()
    weight = graphene.Float()
    protein = graphene.Float()
    glucid = graphene.Float()
    lipid = graphene.Float()


class IngredientType(DjangoObjectType):
    informations = graphene.Field(IngredientInformationsType)  # Ajout du champ informations
    
    class Meta:
        model = Ingredient
        fields = ("id", "range", "name", "calorie", "weight", "protein", "glucid", "lipid") # Les champs du modèle accessible dans le schéma
        
    def resolve_informations(self, info):
        return {
            'calorie': self.calorie,
            'weight': self.weight,
            'protein': self.protein,
            'glucid': self.glucid,
            'lipid': self.lipid,
        }
        
        
        
        
        
        
        
        
        
        
        
# Cette classe regroupe toutes les requêtes disponibles pour ce modèle.
class IngredientQuery(graphene.ObjectType):
    
    allIngredient = graphene.List(IngredientType)

    def resolve_allIngredient(root, info):
        return Ingredient.objects.all()
    
    
    
    
    
    
    
    
    
    
    
    
    
class DeleteIngredient(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        
    success = graphene.Boolean()
    id = graphene.ID()

    def mutate(self, info, id):
        try:
            ingredient = Ingredient.objects.get(pk=id)
            ingredient.delete()
            return DeleteIngredient(success = True, id=id)
        except Ingredient.DoesNotExist:
            return DeleteIngredient(success = False)
            
        
        
class UpdateIngredient(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        range = graphene.String(required=True)
        name = graphene.String(required=True)
        calorie = graphene.Float(required=True)
        weight = graphene.Float(required=True)
        protein = graphene.Float(required=True)
        glucid = graphene.Float(required=True)
        lipid = graphene.Float(required=True)
        
    updateIngredient = graphene.Field(IngredientType)
    
    def mutate(self, info, id, range, name, calorie, weight, protein, glucid, lipid):
        try:
            ingredient = Ingredient.objects.get(pk=id)
            
            ingredient.name = name
            ingredient.range = range
            ingredient.calorie = calorie
            ingredient.weight = weight
            ingredient.protein = protein
            ingredient.glucid = glucid
            ingredient.lipid = lipid

            ingredient.save()
            return UpdateIngredient(updateIngredient=ingredient)
        
        except Ingredient.DoesNotExist:
            return UpdateIngredient(updateIngredient=None)
        
        
        
        
        
        
        
        
        
        
        
    
class CreateIngredient(graphene.Mutation):
    class Arguments:
        range = graphene.String(required=True)
        name = graphene.String(required=True)
        calorie = graphene.Float(required=True)
        weight = graphene.Float(required=True)
        protein = graphene.Float(required=True)
        glucid = graphene.Float(required=True)
        lipid = graphene.Float(required=True)
        
    newIngredient = graphene.Field(IngredientType)
    
    def mutate(self, info, range, name, calorie, weight, protein, glucid, lipid):
        newIngredient = Ingredient(
            range=range,
            name=name,
            calorie=calorie,
            weight=weight,
            protein=protein,
            glucid=glucid,
            lipid=lipid,
        )
        newIngredient.save()
        
        return CreateIngredient(newIngredient = newIngredient)
    
    
    
    
    
    
# Cette classe regroupe toutes les mutations disponibles pour ce modèle.
class IngredientMutation(graphene.ObjectType):
    createIngredient = CreateIngredient.Field()
    updateIngredient = UpdateIngredient.Field()
    deleteIngredient = DeleteIngredient.Field()
    
schema = graphene.Schema(query=IngredientQuery, mutation=IngredientMutation)