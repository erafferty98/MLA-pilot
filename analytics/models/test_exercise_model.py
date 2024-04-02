import unittest
from unittest.mock import MagicMock

from exercise_model import aggregate_general_stats

class ExerciseModelTests(unittest.TestCase):
    def setUp(self):
        # Mocking the database connection
        self.db = MagicMock()

    def test_aggregate_general_stats(self):
        # Mocking the result of the database aggregation
        self.db.exercises.aggregate.return_value = [
            {"username": "user1", "exercises": [
                {"exerciseType": "running", "totalDuration": 60},
                {"exerciseType": "cycling", "totalDuration": 120}
            ]},
            {"username": "user2", "exercises": [
                {"exerciseType": "swimming", "totalDuration": 90},
                {"exerciseType": "cycling", "totalDuration": 180}
            ]}
        ]

        expected_result = [
            {"username": "user1", "exercises": [
                {"exerciseType": "running", "totalDuration": 60},
                {"exerciseType": "cycling", "totalDuration": 120}
            ]},
            {"username": "user2", "exercises": [
                {"exerciseType": "swimming", "totalDuration": 90},
                {"exerciseType": "cycling", "totalDuration": 180}
            ]}
        ]

        result = aggregate_general_stats()

        self.assertEqual(result, expected_result)

if __name__ == '__main__':
    unittest.main()