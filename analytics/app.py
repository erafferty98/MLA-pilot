from flask import Flask
from flask_cors import CORS
from analytics.routes.stats_routes import stats_blueprint
from analytics.routes.chatbot_routes import chatbot_blueprint

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")
app.register_blueprint(stats_blueprint, url_prefix='/api')
app.register_blueprint(chatbot_blueprint, url_prefix='/api')


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5050)