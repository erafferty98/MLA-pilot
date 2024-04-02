import unittest
from unittest.mock import MagicMock, patch
import os

from utils import get_db

class UtilsTests(unittest.TestCase):
    @patch('utils.MongoClient')
    def test_get_db(self, mock_mongo_client):
        # Mocking the environment variables
        os.environ['MONGO_URI'] = 'mongodb://localhost:27017'
        os.environ['MONGO_DB'] = 'test_db'

        # Mocking the MongoClient instance
        mock_mongo_instance = MagicMock()
        mock_mongo_client.return_value = mock_mongo_instance

        # Call the function
        result = get_db()

        # Assertions
        self.assertEqual(result, mock_mongo_instance.test_db)
        mock_mongo_client.assert_called_with('mongodb://localhost:27017')
        mock_mongo_instance.__getitem__.assert_called_with('test_db')

if __name__ == '__main__':
    unittest.main()