from ariadne import QueryType
from stats_functions import stats, user_stats

query = QueryType()

@query.field("stats")
def resolve_stats(_, info):
    return stats()

@query.field("filteredStats")
def resolve_filteredStats(*_, name=None):
    return user_stats(name)