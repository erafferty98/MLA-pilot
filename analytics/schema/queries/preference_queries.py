import graphene
from ..types.preference_types import Preference

class PreferenceQuery(graphene.ObjectType):
    getAllPreferences = graphene.List(Preference)