import graphene

# Define a GraphQL object type for user preferences.
class Preference(graphene.ObjectType):
    username = graphene.String(required=True, description="Username of the user")
    goal = graphene.String(description="User's fitness goal")
    fitnessLevel = graphene.String(description="User's fitness level")
    availableTime = graphene.Int(description="Available time per session in minutes")
    workoutSchedule = graphene.List(graphene.String, description="Preferred workout days")
    equipment = graphene.List(graphene.String, description="Available equipment")
    limitations = graphene.List(graphene.String, description="Physical limitations")
    feedback = graphene.String(description="Feedback on previous routines")
    routine = graphene.String(description="Current workout routine")

# Input object type for updating preferences. This helps in mutations.
class PreferenceInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    goal = graphene.String()
    fitnessLevel = graphene.String()
    availableTime = graphene.Int()
    workoutSchedule = graphene.List(graphene.String)
    equipment = graphene.List(graphene.String)
    limitations = graphene.List(graphene.String)
    feedback = graphene.String()
    routine = graphene.String()
