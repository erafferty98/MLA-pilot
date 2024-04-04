from flask import Blueprint, jsonify, request
from ..schema.schema import schema

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/stats', methods=['POST'])
def stats():
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

@stats_bp.route('/stats/<username>', methods=['GET'])
def user_stats(username):
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

@stats_bp.route('/stats/weekly/', methods=['GET'])
def weekly_user_stats():
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