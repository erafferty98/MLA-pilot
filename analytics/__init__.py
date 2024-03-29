from flask import Flask
from flask_cors import CORS
from .config import Config
from pymongo import MongoClient

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")

    app.config.from_object(Config)

    client = MongoClient(app.config['MONGO_URI'])
    app.db = client[app.config['MONGO_DB']]
    app.user_collection = app.db['users']

    with app.app_context():
        from . import routes

    return app
