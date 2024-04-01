from flask import Flask
from flask_cors import CORS
from .utils import initialize_db
from .routes.stats_routes import stats_blueprint
from .routes.chatbot import chatbot

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")
    initialize_db(app)
    app.register_blueprint(stats_blueprint, url_prefix='/api')
    app.register_blueprint(chatbot, url_prefix='/api')
    return app