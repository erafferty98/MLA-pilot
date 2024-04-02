from flask import Blueprint, request, jsonify
import openai
import os

chatbot = Blueprint('chatbot', __name__)

@chatbot.route('/Chatbot', methods=['POST'])
def handle_chatbot():
    """
    Handle the chatbot request and generate a personalized workout plan based on user input.

    Returns:
        A JSON response containing the generated workout plan.
    """
    try:
        data = request.json
        user_goal = data.get('goal', '')
        user_fitness_level = data.get('fitness level', '')
        user_equipment = data.get('equipment available', '')
        user_limitations = data.get('limitations', 'no known limitations')
        user_available_time = data.get('workout duration', '')
        user_workout_schedule = data.get('user workout schedule', '')
        user_feedback = data.get('user feedback', '')

        user_data = {
            'goal': user_goal,
            'fitness_level': user_fitness_level,
            'equipment': user_equipment,
            'limitations': user_limitations,
            'workout_duration': user_available_time,
            'workout_schedule': user_workout_schedule,
            'feedback': user_feedback
        }
        # app.user_collection.insert_one(user_data)  

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
        return jsonify({'reply': chat_response})
    except Exception as e:
        # Use logging.error and traceback.print_exc() if you have logging configured
        return jsonify(error="An error occurred processing your request"), 500