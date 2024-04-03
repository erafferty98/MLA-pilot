from dotenv import load_dotenv
import os

def load_environment_variables():
    load_dotenv()

def get_mongo_uri():
    return os.getenv('MONGO_URI')

# schema.py
from ariadne import load_schema_from_path, make_executable_schema
from ariadne.constants import PLAYGROUND_HTML

type_defs = load_schema_from_path("schema.graphql")
schema = make_executable_schema(type_defs)