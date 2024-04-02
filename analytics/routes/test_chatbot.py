import unittest
from unittest.mock import MagicMock
from flask import Flask, jsonify

from chatbot_routes import handle_chatbot

class ChatbotRoutesTests(unittest.TestCase):
    def setUp(self):
        # Create a test Flask app
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True

    def test_handle_chatbot(self):
        # Create a test client
        client = self.app.test_client()

        # Mock the request.json data
        request_data = {
            'goal': 'lose weight',
            'fitness level': 'beginner',
            'equipment available': 'dumbbells',
            'limitations': 'no known limitations',
            'workout duration': '30 minutes',
            'user workout schedule': 'Monday, Wednesday, Friday',
            'user feedback': 'good'
        }
        client.post = MagicMock(return_value=request_data)

        # Mock the openai.Completion.create method
        openai.Completion.create = MagicMock(return_value={
            'choices': [{'text': 'Here is your personalized workout plan.'}]
        })

        # Call the handle_chatbot function
        response = client.post('/Chatbot')

        # Assertions
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {'reply': 'Here is your personalized workout plan.'})
        client.post.assert_called_with('/Chatbot')
        openai.Completion.create.assert_called_with(
            engine="text-davinci-003",
            prompt=mock.ANY,
            temperature=0.7,
            max_tokens=500,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )

if __name__ == '__main__':
    unittest.main()