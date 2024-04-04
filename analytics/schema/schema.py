import graphene
from .queries.exercise_queries import ExerciseQuery
from .queries.preference_queries import PreferenceQuery
from .mutations.preference_mutations import UpdatePreferences

class Mutation(graphene.ObjectType):
    update_preferences = UpdatePreferences.Field()

class Query(ExerciseQuery, PreferenceQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)