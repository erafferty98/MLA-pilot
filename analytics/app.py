from flask import Flask
from flask_cors import CORS
from flask_graphql import GraphQLView
from dotenv import load_dotenv
import graphene
from .models import mongo, ExerciseType
from .routes import stats_bp, user_preferences_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")

# Initialize PyMongo
app.config["MONGO_URI"] = os.getenv('MONGO_URI')
mongo.init_app(app)

# Define GraphQL queries
class Query(graphene.ObjectType):
    exercises = graphene.List(ExerciseType)

    def resolve_exercises(self, info):
        exercises = mongo.db.exercises.find()
        return [ExerciseType(
            username=exercise['username'],
            exerciseType=exercise['exerciseType'],
            duration=exercise['duration']
        ) for exercise in exercises]

# Create GraphQL schema
schema = graphene.Schema(query=Query)

# GraphQL endpoint
app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

# Register blueprints
app.register_blueprint(stats_bp)
app.register_blueprint(user_preferences_bp)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5050)