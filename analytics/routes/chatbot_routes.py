from flask import Blueprint, request, jsonify
import openai
import os
from graphql.execution import execute
from ..schema.schema import schema
import jwt

chatbot = Blueprint('chatbot', __name__)

def get_username_from_jwt(request):
    # Assuming the JWT token is in the Authorization header
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            # Extract the token part from the header
            token = auth_header.split(" ")[1]
            # Decode the JWT token
            decoded = jwt.decode(token, os.getenv('JWT_SECRET_KEY'), algorithms=["HS256"])
            # Extract the username from the token payload
            return decoded.get('username')
        except jwt.ExpiredSignatureError:
            # Handle expired token
            return None
        except jwt.InvalidTokenError:
            # Handle invalid token
            return None
    return None

@chatbot.route('/Chatbot', methods=['POST'])
def handle_chatbot():
    try:
        username = get_username_from_jwt(request)
        if not username:
            return jsonify(error="Unauthorized or invalid token"), 401
        
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
        # Include error handling, such as logging
        return jsonify(error="An error occurred processing your request"), 500