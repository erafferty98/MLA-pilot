import graphene
from .types.preference_types import Preference
from .models import UserPreferencesModel

class PreferenceQuery(graphene.ObjectType):
    getAllPreferences = graphene.List(Preference)

    def resolve_getAllPreferences(self, info):
        preferences = UserPreferencesModel().get_all_preferences()
        return preferences

class Query(ExerciseQuery, PreferenceQuery, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)