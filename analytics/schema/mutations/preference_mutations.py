import graphene
from ..types.preference_types import Preference, PreferenceInput
from ...utils.db import get_db
from ...utils.get_user import get_username_from_jwt

class UpdatePreferences(graphene.Mutation):
    class Arguments:
        input = PreferenceInput(required=True)

    Output = Preference

    def mutate(self, info, input):
        # Get the username from JWT token
        username = get_username_from_jwt(info.context)

        if not username:
            # If username is not found in JWT, raise an exception or handle it accordingly
            raise Exception("Failed to get username from JWT.")
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
        result = db.preferences.update_one({'username': username}, update_doc, upsert=True)
        
        if result.matched_count == 0 and result.upserted_id is None:
            # Handle the case where the update operation didn't match or insert any documents
            raise Exception("Failed to update user preferences.")

        # Assuming successful update, return the updated preferences
        # This is a simplification. In practice, you might want to fetch the updated document from the database
        return Preference(
            username=username,
            goal=input.goal,
            fitnessLevel=input.fitnessLevel,
            availableTime=input.availableTime,
            workoutSchedule=input.workoutSchedule,
            equipment=input.equipment,
            limitations=input.limitations,
            feedback=input.feedback,
            routine=input.routine
        )