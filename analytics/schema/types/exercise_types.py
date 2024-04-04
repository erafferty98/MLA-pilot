import graphene

class Exercise(graphene.ObjectType):
    exerciseType = graphene.String(required=True)
    subcategory = graphene.String(required=True)
    totalDuration = graphene.Int(required=True)
    totalSets = graphene.Int(required=True)
    totalReps = graphene.Int(required=True)
    averageWeightLifted = graphene.Float(required=True)

class UserExerciseStats(graphene.ObjectType):
    username = graphene.String(required=True)
    exercises = graphene.List(Exercise, required=True)