from flask import Flask
from flask_cors import CORS
from app.utils.db import initialize_db
from app.routes.stats_routes import stats_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")
    initialize_db(app)
    app.register_blueprint(stats_blueprint, url_prefix='/api')
    return app
