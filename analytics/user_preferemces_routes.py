from flask import Blueprint, request, jsonify
from graphql.execution import execute
from ..schema.schema import schema
from ..utils.get_user import get_username_from_jwt
from .models import UserPreferencesModel

user_preferences_bp = Blueprint('user_preferences', __name__)

@user_preferences_bp.route('/user/preferences', methods=['GET'])
def get_user_preferences():
    user_preferences = UserPreferencesModel().get_all_preferences()
    return jsonify(user_preferences)

@user_preferences_bp.route('/user/preferences/update', methods=['POST'])
def update_user_preferences():
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
