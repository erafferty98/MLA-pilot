from flask import Flask
from analytics.routes.stats_routes import stats_blueprint
from .routes.chatbot_routes import chatbot

app = Flask(__name__)
app.register_blueprint(stats_blueprint, url_prefix='/api')
app.register_blueprint(chatbot, url_prefix='/api')
CORS(app, resources={r"/*": {"origins": "*"}}, methods="GET,HEAD,POST,OPTIONS,PUT,PATCH,DELETE")

if __name__ == '__main__':
    app.run(debug=True)