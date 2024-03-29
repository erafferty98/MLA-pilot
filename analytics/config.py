import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv('MONGO_URI')
    MONGO_DB = os.getenv('MONGO_DB')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
