# analytics/app.py
from flask import Flask
from flask_graphql import GraphQLView
from flask_cors import CORS
from .schema.schema import schema
from .models.models import mongo
from .routes.routes import configure_routes
from .utils.db import initialize_db
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()  # Load environment variables from .env file.

    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all domains on all routes.
    
    # MongoDB Configuration
    app.config["MONGO_URI"] = os.getenv('MONGO_URI')
    mongo.init_app(app)

    # Initialize Database
    initialize_db(app)

    # GraphQL Endpoint
    app.add_url_rule(
        '/graphql', 
        view_func=GraphQLView.as_view(
            'graphql', 
            schema=schema, 
            graphiql=True  # Enables the GraphiQL interface for easy testing.
        )
    )

    # Configure other routes
    configure_routes(app)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=os.getenv('PORT', 5000))