from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from schema import schema
from queries import query
from utils import load_environment_variables
import traceback

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")

load_environment_variables()

@app.route('/api/graphql', methods=['GET'])
def graphql_playground():
    return PLAYGROUND_HTML, 200

@app.route('/api/graphql', methods=['POST'])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=True
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code

@app.route('/')
def index():
    exercises = db.exercises.find()
    exercises_list = list(exercises)
    return json_util.dumps(exercises_list)

@app.route('/api/stats/weekly/', methods=['GET'])
def weekly_user_stats():
    # your weekly stats function
    return jsonify(stats=stats)

@app.errorhandler(Exception)
def handle_error(e):
    app.logger.error(f"An error occurred: {e}")
    traceback.print_exc()
    return jsonify(error="An internal error occurred"), 500

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5050)