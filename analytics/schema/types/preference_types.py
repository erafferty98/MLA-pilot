import graphene

class Preference(graphene.ObjectType):
    username = graphene.String(required=True)
    goal = graphene.String(required=True)
    fitnessLevel = graphene.String(required=True)
    availableTime = graphene.Int(required=True)
    workoutSchedule = graphene.List(graphene.String, required=True)
    equipment = graphene.List(graphene.String, required=True)
    limitations = graphene.List(graphene.String)
    feedback = graphene.String()
    routine = graphene.String()

class PreferenceInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    goal = graphene.String(required=True)
    fitnessLevel = graphene.String(required=True)
    availableTime = graphene.Int(required=True)
    workoutSchedule = graphene.List(graphene.String, required=True)
    equipment = graphene.List(graphene.String, required=True)
    limitations = graphene.List(graphene.String)
    feedback = graphene.String()
    routine = graphene.String()