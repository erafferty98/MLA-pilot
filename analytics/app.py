from flask import Flask
from flask_graphql import GraphQLView
from flask_cors import CORS
from .schema.schema import schema
from .models.models import mongo
from .routes.routes import combined_routes_bp
from .utils.db import initialize_db
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus
from bson import json_util
from prometheus_flask_exporter import PrometheusMetrics
import traceback
import logging
import os
from datetime import datetime, timedelta

def create_app():
    load_dotenv()  # Load environment variables from .env file.

    app = Flask(__name__)
    metrics = PrometheusMetrics(app)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all domains on all routes.
    
    # MongoDB Configuration
    app.config["MONGO_URI"] = os.getenv('MONGO_URI')
    mongo.init_app(app)

    # Initialize Database
    initialize_db(app)
    
    metrics.info('app_info', 'Application info', version='1.0.3')

    # GraphQL Endpoint
    app.add_url_rule(
        '/graphql', 
        view_func=GraphQLView.as_view(
            'graphql', 
            schema=schema, 
            graphiql=True  # Enables the GraphiQL interface for easy testing.
        )
    )

    # Register combined_routes_bp blueprint
    app.register_blueprint(combined_routes_bp)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=os.getenv('PORT', 5000))