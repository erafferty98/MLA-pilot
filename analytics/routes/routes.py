# analytics/routes/combined_routes.py

from flask import Blueprint, request, jsonify, current_app
import openai
import os
from graphql.execution import execute
from ..schema.schema import schema
from ..utils.get_user import get_username_from_jwt
from flask_graphql import GraphQLView

# Combined blueprint for all routes
combined_routes_bp = Blueprint('combined', __name__)

# Chatbot route
@combined_routes_bp.route('/Chatbot', methods=['POST'])
def handle_chatbot():
        """
        Handle the chatbot request by updating user preferences and generating a personalized workout plan.

        Returns:
                JSON: The generated workout plan as a reply.
        """
        try:
                username = get_username_from_jwt(request)
                if not username:
                        return jsonify(error="Unauthorized or invalid token"), 401
                
                # Extract data from the request
                data = request.json
                username = data.get('username', 'defaultUser')  # Example username; adjust as necessary
                user_goal = data.get('goal', '')
                user_fitness_level = data.get('fitness level', '')
                user_equipment = data.get('equipment available', '')
                user_limitations = data.get('limitations', 'no known limitations')
                user_available_time = data.get('workout duration', '')
                user_workout_schedule = data.get('user workout schedule', '')
                user_feedback = data.get('user feedback', '')

                # GraphQL mutation to update user preferences
                update_preferences_mutation = f"""
                mutation {{
                    updateUserPreferences(username: "{username}", goal: "{user_goal}", fitnessLevel: "{user_fitness_level}", equipment: "{user_equipment}", limitations: "{user_limitations}", workoutDuration: "{user_available_time}", workoutSchedule: "{user_workout_schedule}", feedback: "{user_feedback}") {{
                        username
                    }}
                }}
                """
                
                # Execute the mutation
                schema.execute_sync(update_preferences_mutation)

                # Generate a prompt for the OpenAI chatbot
                prompt_template = f"""
                I am a fitness assistant crafting personalized workout plans. Here's the profile of my current user:
                - Goal: {user_goal} 
                - Fitness Level: {user_fitness_level} 
                - Available Time: {user_available_time} 
                - Preferred Days/Times: {user_workout_schedule} 
                - Equipment: {user_equipment}
                - Limitations: {user_limitations}
                - Feedback on Last Plan: {user_feedback}
                Based on this, what would be a good weekly workout plan?
                """

                # Generate a response from the OpenAI chatbot
                openai.api_key = os.getenv('OPENAI_API_KEY')
                response = openai.Completion.create(
                        engine="text-davinci-003",
                        prompt=prompt_template,
                        temperature=0.7,
                        max_tokens=500,
                        top_p=1.0,
                        frequency_penalty=0.0,
                        presence_penalty=0.0
                )

                chat_response = response.choices[0].text.strip()

                # GraphQL mutation to save the workout routine
                save_routine_mutation = f"""
                mutation {{
                    saveWorkoutRoutine(username: "{username}", routine: """ + '"' + chat_response + '"' + """) {{
                        username
                    }}
                }}
                """
                
                # Execute the mutation
                schema.execute_sync(save_routine_mutation)

                return jsonify({'reply': chat_response})
        except Exception as e:
                return jsonify(error="An error occurred processing your request"), 500

# Stats routes
@combined_routes_bp.route('/stats', methods=['POST'])
def stats():
    """
    Retrieves statistics about exercises.

    Returns:
        A JSON response containing exercise statistics.
    """
    query = '''
        query {
            exercises {
                exerciseType
                totalDuration
            }
        }
    '''
    result = schema.execute(query)
    if result.errors:
        return jsonify({'error': result.errors[0].message}), 500
    return jsonify({'stats': result.data['exercises']})

@combined_routes_bp.route('/stats/<username>', methods=['GET'])
def user_stats(username):
    """
    Retrieve statistics for a specific user.

    Args:
        username (str): The username of the user.

    Returns:
        dict: A dictionary containing the user's statistics.

    Raises:
        HTTPException: If there is an error retrieving the statistics.

    """
    query = '''
        query($username: String!) {
            userStats(username: $username) {
                username
                exercises {
                    exerciseType
                    totalDuration
                }
            }
        }
    '''
    variables = {'username': username}
    result = schema.execute(query, variables=variables)
    if result.errors:
        return jsonify({'error': result.errors[0].message}), 500
    return jsonify({'stats': result.data['userStats']})

@combined_routes_bp.route('/stats/weekly/', methods=['GET'])
def weekly_user_stats():
    """
    Retrieves weekly user statistics based on the provided parameters.

    Parameters:
    - username (str): The username of the user.
    - start_date (str): The start date of the weekly period.
    - end_date (str): The end date of the weekly period.

    Returns:
    - JSON response containing the weekly user statistics.

    Example:
    GET /stats/weekly/?user=johndoe&start=2022-01-01&end=2022-01-07

    Response:
    {
        "stats": [
            {
                "exerciseType": "Running",
                "totalDuration": 120
            },
            {
                "exerciseType": "Cycling",
                "totalDuration": 90
            }
        ]
    }
    """
    username = request.args.get('user')
    start_date = request.args.get('start')
    end_date = request.args.get('end')

    query = '''
        query($username: String!, $start: String!, $end: String!) {
            weeklyUserStats(username: $username, start: $start, end: $end) {
                exerciseType
                totalDuration
            }
        }
    '''
    variables = {'username': username, 'start': start_date, 'end': end_date}
    result = schema.execute(query, variables=variables)
    if result.errors:
        return jsonify({'error': result.errors[0].message}), 500
    return jsonify({'stats': result.data['weeklyUserStats']})

# User preferences route
@combined_routes_bp.route('/user/preferences', methods=['GET'])
def get_user_preferences():
    """
    Retrieve the user preferences.

    Returns:
        A JSON response containing the user preferences.
    """
    user_preferences = UserPreferencesModel().get_all_preferences()
    return jsonify(user_preferences)

@combined_routes_bp.route('/user/preferences/update', methods=['POST'])
def update_user_preferences():
    """
    Updates the preferences of a user.

    This function retrieves the username from the JWT token in the request headers.
    If the username is not found or the token is invalid, it returns an error response with status code 401.
    Otherwise, it retrieves the new preferences from the request JSON and updates the user's preferences using the UserPreferencesModel.
    If the update is successful, it returns a success response with status code 200.
    If the update fails, it returns an error response with status code 500.
    If any exception occurs during the processing of the request, it returns an error response with status code 500.

    Returns:
        A JSON response with either a success or error message.

    """
    try:
        username = get_username_from_jwt(request)
        if not username:
            return jsonify(error="Unauthorized or invalid token"), 401
        
        new_preferences = request.json
        
        result = UserPreferencesModel().update_preferences(new_preferences)
        if result:
            return jsonify(success=True)
        else:
            return jsonify(error="Failed to update preferences"), 500
    except Exception as e:
        return jsonify(error="An error occurred processing your request"), 500

# GraphQL endpoint (optional, if you want to include it in the combined routes)
combined_routes_bp.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True)
)
