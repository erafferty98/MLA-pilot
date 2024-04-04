from analytics.utils import get_db
from bson import ObjectId
from datetime import datetime
import logging

# If your project is not already using logging, you might need to configure logging first.
logging.basicConfig(level=logging.INFO)

class ExerciseModel:
    def __init__(self):
        self.db = get_db()

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