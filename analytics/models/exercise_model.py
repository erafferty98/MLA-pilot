# models/exercise_model.py

from app.utils.db import get_db
from bson import ObjectId
from datetime import datetime

def get_all_exercises():
    db = get_db()
    return list(db.exercises.find({}))

def aggregate_user_stats(username):
    db = get_db()
    pipeline = [
        {"$match": {"username": username}},
        {"$group": {"_id": {"exerciseType": "$exerciseType"}, "totalDuration": {"$sum": "$duration"}}},
        {"$project": {"exerciseType": "$_id.exerciseType", "totalDuration": 1, "_id": 0}}
    ]
    return list(db.exercises.aggregate(pipeline))

def aggregate_general_stats():
    db = get_db()
    pipeline = [
        {"$group": {"_id": {"username": "$username", "exerciseType": "$exerciseType"}, "totalDuration": {"$sum": "$duration"}}},
        {"$group": {"_id": "$_id.username", "exercises": {"$push": {"exerciseType": "$_id.exerciseType", "totalDuration": "$totalDuration"}}}},
        {"$project": {"username": "$_id", "exercises": 1, "_id": 0}}
    ]
    return list(db.exercises.aggregate(pipeline))

def aggregate_weekly_stats(username, start_date, end_date):
    db = get_db()
    pipeline = [
        {"$match": {"username": username, "date": {"$gte": start_date, "$lt": end_date}}},
        {"$group": {"_id": {"exerciseType": "$exerciseType"}, "totalDuration": {"$sum": "$duration"}}},
        {"$project": {"exerciseType": "$_id.exerciseType", "totalDuration": 1, "_id": 0}}
    ]
    return list(db.exercises.aggregate(pipeline))
