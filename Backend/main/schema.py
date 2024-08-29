import graphene
from ingredient.schema import IngredientQuery, IngredientMutation

class Query(IngredientQuery, graphene.ObjectType):
    pass

class Mutation(IngredientMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)