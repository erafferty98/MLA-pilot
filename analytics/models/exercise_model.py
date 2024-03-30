# models/exercise_model.py

from analytics.utils import get_db
from bson import ObjectId
from datetime import datetime

def get_all_exercises():
    """
    Retrieves all exercises from the database.

    Returns:
        A list of all exercises in the database.
    """
    db = get_db()
    return list(db.exercises.find({}))

def aggregate_user_stats(username):
    """
    Aggregates the user statistics for a given username.

    Args:
        username (str): The username for which to aggregate the statistics.

    Returns:
        list: A list of dictionaries containing the aggregated statistics for each exercise type.
              Each dictionary contains the exercise type and the total duration for that exercise type.

    """
    db = get_db()
    pipeline = [
        {"$match": {"username": username}},
        {"$group": {
            "_id": {"exerciseType": "$exerciseType", "subcategory": "$subcategory"},
            "totalDuration": {"$sum": "$duration"},
            "totalSets": {"$sum": "$sets"},
            "totalReps": {"$sum": "$reps"},
            "averageWeightLifted": {"$avg": "$weight"}
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
    return list(db.exercises.aggregate(pipeline))

def aggregate_general_stats():
    """
    Aggregates general statistics for exercises.

    Returns:
        A list of dictionaries containing aggregated exercise statistics.
        Each dictionary contains the following keys:
        - 'username': The username of the user.
        - 'exercises': A list of dictionaries representing each exercise.
          Each exercise dictionary contains the following keys:
          - 'exerciseType': The type of exercise.
          - 'totalDuration': The total duration of the exercise.
    """
    db = get_db()
    pipeline = [
        {"$group": {
            "_id": {"username": "$username", "exerciseType": "$exerciseType", "subcategory": "$subcategory"},
            "totalDuration": {"$sum": "$duration"},
            "totalSets": {"$sum": "$sets"},
            "totalReps": {"$sum": "$reps"},
            "averageWeightLifted": {"$avg": "$weight"}
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
    return list(db.exercises.aggregate(pipeline))

def aggregate_weekly_stats(username, start_date, end_date):
    """
    Aggregates the weekly exercise statistics for a given username within a specified date range.

    Args:
        username (str): The username for which to aggregate the statistics.
        start_date (datetime): The start date of the date range.
        end_date (datetime): The end date of the date range.

    Returns:
        list: A list of dictionaries containing the aggregated exercise statistics.
              Each dictionary contains the exercise type and the total duration for that exercise type.
    """
    db = get_db()
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
            "averageWeightLifted": {"$avg": "$weight"}
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
    return list(db.exercises.aggregate(pipeline))
