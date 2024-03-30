from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import logging
from ..models.exercise_model import *

# Create the stats blueprint
stats_blueprint = Blueprint('stats', __name__)

# Route to get all exercises
@stats_blueprint.route('/', methods=['GET'])
def index():
    exercises_list = get_all_exercises()
    return jsonify(exercises_list)

# Route for aggregated statistics for all users
@stats_blueprint.route('/stats', methods=['GET'])
def stats():
    stats_data = aggregate_general_stats()
    return jsonify(stats=stats_data)

# Route for aggregated statistics for a specific user
@stats_blueprint.route('/stats/<username>', methods=['GET'])
def user_stats(username):
    stats_data = aggregate_user_stats(username)
    return jsonify(stats=stats_data)

# Route for aggregated weekly statistics for a specific user
@stats_blueprint.route('/stats/weekly/', methods=['GET'])
def weekly_user_stats():
    username = request.args.get('user')
    start_date_str = request.args.get('start')
    end_date_str = request.args.get('end')
    date_format = "%Y-%m-%d"
    try:
        start_date = datetime.strptime(start_date_str, date_format)
        end_date = datetime.strptime(end_date_str, date_format) + timedelta(days=1)  # Include the whole end day
        logging.info(f"Fetching weekly stats for user: {username} from {start_date} to {end_date}")
    except Exception as e:
        logging.error(f"Error parsing dates: {e}")
        return jsonify(error="Invalid date format"), 400

    stats_data = aggregate_weekly_stats(username, start_date, end_date)
    return jsonify(stats=stats_data)
