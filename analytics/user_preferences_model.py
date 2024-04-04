from analytics.utils import get_db
import logging

# Ensure logging is appropriately set up in your application
logging.basicConfig(level=logging.INFO)

class UserPreferencesModel:
    """
    Represents a user's preferences for exercise routines.

    Attributes:
        db: The database connection object.
    """

    def __init__(self):
        self.db = get_db()

    def get_all_preferences(self):
        """
        Retrieves all preferences from the database.

        Returns:
            A list of all preferences in the database or an empty list in case of error.
        """
        try:
            return list(self.db.preferences.find({}))
        except Exception as e:
            logging.error(f"Failed to retrieve all preferences: {e}")
            return []

    def update_preferences(self, new_preferences):
        """
        Updates the user's preferences with the provided values.

        Args:
            new_preferences: An object containing the new preference values.

        Returns:
            The result of the update operation or None in case of error.
        """
        update_fields = {
            'username': new_preferences['username'],
            'goal': new_preferences['goal'],
            'fitness_level': new_preferences['fitnessLevel'],
            'available_time': new_preferences['availableTime'],
            'workout_schedule': new_preferences['workoutSchedule'],
            'equipment': new_preferences['equipment'],
            'limitations': new_preferences['limitations'],
            'feedback': new_preferences['feedback'],
            'routine': new_preferences['routine']
        }
        
        try:
            result = self.db.preferences.update_one(
                {'username': new_preferences['username']},
                {'$set': update_fields},
                upsert=True  # Creates a new document if one doesn't exist
            )
            return result
        except Exception as e:
            logging.error(f"Failed to update preferences for {new_preferences['username']}: {e}")
            return None

    def __str__(self):
        return (f"User: {self.username}, Goal: {self.goal}, Fitness Level: {self.fitness_level}, "
                f"Available Time: {self.available_time}, Workout Schedule: {self.workout_schedule}, "
                f"Equipment: {self.equipment}, Limitations: {self.limitations}, Feedback: {self.feedback}, "
                f"Routine: {self.routine}")