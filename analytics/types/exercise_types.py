import graphene

# Define a GraphQL object type for exercise stats. Adjust fields as necessary based on your data model.
class ExerciseStats(graphene.ObjectType):
    exerciseType = graphene.String(required=True, description="Type of exercise")
    subcategory = graphene.String(description="Subcategory of the exercise")
    totalDuration = graphene.Int(required=True, description="Total duration of exercises in minutes")
    totalSets = graphene.Int(description="Total sets performed")
    totalReps = graphene.Int(description="Total repetitions performed")
    averageWeightLifted = graphene.Float(description="Average weight lifted across sessions")

# UserExerciseStats can aggregate exercise stats for a specific user
class UserExerciseStats(graphene.ObjectType):
    username = graphene.String(required=True, description="Username of the user")
    exercises = graphene.List(ExerciseStats, required=True, description="List of exercise stats")