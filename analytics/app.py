from dotenv import load_dotenv
from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient
from flask_pymongo import PyMongo
from flask_cors import CORS
from urllib.parse import quote_plus
from bson import json_util
import traceback
import logging
import os
from datetime import datetime, timedelta
import openai

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}},
     methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')
mongo_db = os.getenv('MONGO_DB')
openai_api_key = os.getenv('OPENAI_API_KEY')

client = MongoClient(mongo_uri)
db = client[mongo_db]


@app.route('/')
def index():
    exercises = db.exercises.find()
    exercises_list = list(exercises)
    return json_util.dumps(exercises_list)


@app.route('/stats')
def stats():
    pipeline = [
        {
            "$group": {
                "_id": {
                    "username": "$username",
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"}
            }
        },
        {
            "$group": {
                "_id": "$_id.username",
                "exercises": {
                    "$push": {
                        "exerciseType": "$_id.exerciseType",
                        "totalDuration": "$totalDuration"
                    }
                }
            }
        },
        {
            "$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }
        }
    ]

    stats = list(db.exercises.aggregate(pipeline))
    return jsonify(stats=stats)


@app.route('/stats/<username>', methods=['GET'])
def user_stats(username):
    pipeline = [
        {
            "$match": {"username": username}
        },
        {
            "$group": {
                "_id": {
                    "username": "$username",
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"}
            }
        },
        {
            "$group": {
                "_id": "$_id.username",
                "exercises": {
                    "$push": {
                        "exerciseType": "$_id.exerciseType",
                        "totalDuration": "$totalDuration"
                    }
                }
            }
        },
        {
            "$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }
        }
    ]

    stats = list(db.exercises.aggregate(pipeline))
    return jsonify(stats=stats)


@app.route('/stats/weekly/', methods=['GET'])
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

    pipeline = [
        {
            "$match": {
                "username": username,
                "date": {
                    "$gte": start_date,
                    "$lt": end_date
                }
            }
        },
        {
            "$group": {
                "_id": {
                    "exerciseType": "$exerciseType"
                },
                "totalDuration": {"$sum": "$duration"}
            }
        },
        {
            "$project": {
                "exerciseType": "$_id.exerciseType",
                "totalDuration": 1,
                "_id": 0
            }
        }
    ]

    try:
        stats = list(db.exercises.aggregate(pipeline))
        return jsonify(stats=stats)
    except Exception as e:
        current_app.logger.error(f"An error occurred while querying MongoDB: {e}")
        traceback.print_exc()
        return jsonify(error="An internal error occurred"), 500
    
@app.route('/Chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.json
        user_goal = data.get('goal', '')
        user_fitness_level = data.get('fitness level','')
        user_equipment = data.get('equipment available', '')
        user_limitations = data.get('limitations', 'no known limitations')
        user_available_time = data.get('workout duration', '')
        user_workout_schedule = data.get('user workout schedule', '')
        user_feedback = data.get('user feedback','')

        # Store user preferences and acceptance in the database
        user_data = {
            'goal': user_goal,
            'fitness_level': user_fitness_level,
            'equipment': user_equipment,
            'limitations': user_limitations,
            'workout_duration': user_available_time,
            'workout_schedule': user_workout_schedule,
            'feedback': user_feedback
        }
        app.user_collection.insert_one(user_data)  # Using current_app to access user_collection

        # Update prompt template to include new options
        prompt_template = f"""
        I am a fitness assistant crafting personalized workout plans. Here's the profile of my current user:
        - Goal: {user_goal} 
        - Fitness Level: {user_fitness_level} 
        - Available Time: {user_available_time} 
        - Preferred Days/Times: {user_workout_schedule} 
        - Equipment: {user_equipment}
        - Limitations: {user_limitations} (e.g., "knee pain")
        - Feedback on Last Plan: {user_feedback} (e.g., "the previous plan was too easy")
        Based on this, what would be a good weekly workout plan?
        """

        openai.api_key = openai_api_key
        # Send the updated prompt to the OpenAI API
        response = openai.Completion.create(
            engine="text-davinci-003",  # or the latest most appropriate model
            prompt=prompt_template,
            temperature=0.7,
            max_tokens=500,  # Adjusted for potentially longer responses
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )

        # Extract and return the text response
        chat_response = response.choices[0].text.strip()

        return jsonify({'reply': chat_response})
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        traceback.print_exc()
        return jsonify(error="An error occurred processing your request"), 500



if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5050)