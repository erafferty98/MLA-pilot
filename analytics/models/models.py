# analytics/models/unified_models.py

from flask_pymongo import PyMongo
import graphene
from bson import ObjectId
from datetime import datetime
import logging

# Ensure logging is properly set up
logging.basicConfig(level=logging.INFO)

mongo = PyMongo()

# GraphQL Types for Exercise
class Exercise(graphene.ObjectType):
    exerciseType = graphene.String(required=True)
    subcategory = graphene.String(required=True)
    totalDuration = graphene.Int(required=True)
    totalSets = graphene.Int(required=True)
    totalReps = graphene.Int(required=True)
    averageWeightLifted = graphene.Float(required=True)

# GraphQL Types for User Exercise Stats
class UserExerciseStats(graphene.ObjectType):
    username = graphene.String(required=True)
    exercises = graphene.List(Exercise, required=True)

# Exercise Model
class ExerciseModel:
    def __init__(self, db):
        self.db = db

    def get_all_exercises(self):
        """
        Retrieves all exercises from the database.

        Returns:
            A list of all exercises in the database or an empty list in case of error.
        """
        try:
            return list(self.db.exercises.find({}))
        except Exception as e:
            logging.error(f"Failed to retrieve all exercises: {e}")
            return []

    def aggregate_user_stats(self, username):
        """
        Aggregates the user statistics for a given username.

        Args:
            username (str): The username for which to aggregate the statistics.

        Returns:
            list: A list of dictionaries containing the aggregated statistics for each exercise type or an empty list in case of error.
        """
        pipeline = [
            {"$match": {"username": username}},
            {"$group": {
                "_id": {"exerciseType": "$exerciseType", "subcategory": "$subcategory"},
                "totalDuration": {"$sum": "$duration"},
                "totalSets": {"$sum": "$sets"},
                "totalReps": {"$sum": "$reps"},
                "averageWeightLifted": {"$avg": "$weightLifted"}
            }},
            {"$project": {
                "exerciseType": "$_id.exerciseType",
                "subcategory": "$_id.subcategory",
                "totalDuration": 1,
                "totalSets": 1,
                "totalReps": 1,
                "averageWeightLifted": 1,
                "_id": 0
            }}
        ]
        try:
            return list(self.db.exercises.aggregate(pipeline))
        except Exception as e:
            logging.error(f"Failed to aggregate user stats for {username}: {e}")
            return []

    def aggregate_general_stats(self):
        """
        Aggregates general statistics for exercises.

        Returns:
            A list of dictionaries containing aggregated exercise statistics or an empty list in case of error.
        """
        pipeline = [
            {"$group": {
                "_id": {"username": "$username", "exerciseType": "$exerciseType", "subcategory": "$subcategory"},
                "totalDuration": {"$sum": "$duration"},
                "totalSets": {"$sum": "$sets"},
                "totalReps": {"$sum": "$reps"},
                "averageWeightLifted": {"$avg": "$weightLifted"}
            }},
            {"$group": {
                "_id": "$_id.username",
                "exercises": {"$push": {
                    "exerciseType": "$_id.exerciseType",
                    "subcategory": "$_id.subcategory",
                    "totalDuration": "$totalDuration",
                    "totalSets": "$totalSets",
                    "totalReps": "$totalReps",
                    "averageWeightLifted": "$averageWeightLifted"
                }}
            }},
            {"$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }}
        ]
        try:
            return list(self.db.exercises.aggregate(pipeline))
        except Exception as e:
            logging.error("Failed to aggregate general stats: {e}")
            return []

    def aggregate_weekly_stats(self, username, start_date, end_date):
        """
        Aggregates the weekly exercise statistics for a given username within a specified date range.

        Args:
            username (str): The username for which to aggregate the statistics.
            start_date (datetime): The start date of the date range.
            end_date (datetime): The end date of the date range.

        Returns:
            list: A list of dictionaries containing the aggregated exercise statistics or an empty list in case of error.
        """
        pipeline = [
            {"$match": {
                "username": username,
                "date": {"$gte": start_date, "$lt": end_date}
            }},
            {"$group": {
                "_id": {"exerciseType": "$exerciseType", "subcategory": "$subcategory"},
                "totalDuration": {"$sum": "$duration"},
                "totalSets": {"$sum": "$sets"},
                "totalReps": {"$sum": "$reps"},
                "averageWeightLifted": {"$avg": "$weightLifted"}
            }},
            {"$project": {
                "exerciseType": "$_id.exerciseType",
                "subcategory": "$_id.subcategory",
                "totalDuration": 1,
                "totalSets": 1,
                "totalReps": 1,
                "averageWeightLifted": 1,
                "_id": 0
            }}
        ]
        try:
            return list(self.db.exercises.aggregate(pipeline))
        except Exception as e:
            logging.error(f"Failed to aggregate weekly stats for {username}: {e}")
            return []

# User Preferences Model
class UserPreferencesModel:
    def __init__(self, db):
        self.db = db

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

# Initialize the models with the database connection
def init_models(db):
    return ExerciseModel(db), UserPreferencesModel(db)
