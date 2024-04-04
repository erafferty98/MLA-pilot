import graphene
from ..types.exercise_types import UserExerciseStats
from ...models.exercise_model import ExerciseModel

class ExerciseQuery(graphene.ObjectType):
    getAllExerciseStats = graphene.List(UserExerciseStats)
    def resolve_getAllExerciseStats(root, info):
        # Logic to fetch and return all exercise stats
        return ExerciseModel.aggregate_general_stats()