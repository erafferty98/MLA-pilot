# utils/db.py

from flask import current_app, g
import os
from pymongo import MongoClient

def get_db():
    """
    Returns the database connection object.

    If the database connection object does not exist in the global `g` object,
    it creates a new connection using the MongoDB URI and database name
    specified in the environment variables `MONGO_URI` and `MONGO_DB`.

    Returns:
        The database connection object.

    """
    if 'db' not in g:
        g.db = MongoClient(os.getenv('MONGO_URI'))[os.getenv('MONGO_DB')]
    return g.db

def initialize_db(app):
    """
    Initializes the database for the application.

    Args:
        app: The Flask application object.

    Returns:
        None
    """
    app.teardown_appcontext(close_db)

def close_db(e=None):
    """
    Closes the database connection.

    Args:
        e: An optional exception object.

    Returns:
        None
    """
    db = g.pop('db', None)
    if db is not None:
        db.client.close()
