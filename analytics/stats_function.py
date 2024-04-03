from pymongo import MongoClient
from bson import json_util
from datetime import datetime

client = MongoClient(get_mongo_uri())
db = client.test

def stats():
    pipeline = [
        # your aggregation pipeline for stats
    ]
    stats = list(db.exercises.aggregate(pipeline))
    return stats

def user_stats(username):
    pipeline = [
        # your aggregation pipeline for user stats
    ]
    stats = list(db.exercises.aggregate(pipeline))
    return stats