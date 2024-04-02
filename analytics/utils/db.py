# utils/db.py

from flask import current_app, g
import os
from pymongo import MongoClient

def get_db():
    if 'db' not in g:
        g.db = MongoClient(os.getenv('MONGO_URI'))[os.getenv('MONGO_DB')]
    return g.db

def initialize_db(app):
    app.teardown_appcontext(close_db)

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.client.close()
