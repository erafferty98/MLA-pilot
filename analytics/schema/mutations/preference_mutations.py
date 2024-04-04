import graphene
from ..types.preference_types import Preference, PreferenceInput
from ...utils.db import get_db

class UpdatePreferences(graphene.Mutation):
    class Arguments:
        input = PreferenceInput(required=True)

    Output = Preference

    def mutate(self, info, input):
        db = get_db()
        # Construct the update document
        update_doc = {
            "$set": {
                'goal': input.goal,
                'fitnessLevel': input.fitnessLevel,
                'availableTime': input.availableTime,
                'workoutSchedule': input.workoutSchedule,
                'equipment': input.equipment,
                'limitations': input.limitations,
                'feedback': input.feedback,
                'routine': input.routine
            }
        }
        
        # Perform the update operation; upsert=True creates the document if it doesn't exist
        result = db.preferences.update_one({'username': input.username}, update_doc, upsert=True)
        
        if result.matched_count == 0 and result.upserted_id is None:
            # Handle the case where the update operation didn't match or insert any documents
            raise Exception("Failed to update user preferences.")

        # Assuming successful update, return the updated preferences
        # This is a simplification. In practice, you might want to fetch the updated document from the database
        return Preference(
            username=input.username,
            goal=input.goal,
            fitnessLevel=input.fitnessLevel,
            availableTime=input.availableTime,
            workoutSchedule=input.workoutSchedule,
            equipment=input.equipment,
            limitations=input.limitations,
            feedback=input.feedback,
            routine=input.routine
        )