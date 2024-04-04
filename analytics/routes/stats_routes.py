from flask_graphql import GraphQLView
from analytics.schema.schema import schema
from flask import Blueprint

stats_blueprint = Blueprint('stats', __name__)

stats_blueprint.add_url_rule(
    '/graphql',
    view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True)
)
