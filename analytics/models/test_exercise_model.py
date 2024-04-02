import unittest
from unittest.mock import MagicMock

from exercise_model import aggregate_general_stats

class ExerciseModelTests(unittest.TestCase):
    def setUp(self):
        # Mocking the database connection
        self.db = MagicMock()

    def test_aggregate_general_stats(self):
        # Mocking the database collection
        collection = MagicMock()
        self.db.exercises = collection

        # Mocking the aggregate method
        collection.aggregate.return_value = [
            {
                "username": "user1",
                "exercises": [
                    {
                        "exerciseType": "running",
                        "subcategory": "cardio",
                        "totalDuration": 120,
                        "totalSets": 0,
                        "totalReps": 0,
                        "averageWeightLifted": 0
                    },
                    {
                        "exerciseType": "weightlifting",
                        "subcategory": "strength",
                        "totalDuration": 60,
                        "totalSets": 3,
                        "totalReps": 10,
                        "averageWeightLifted": 50
                    }
                ]
            },
            {
                "username": "user2",
                "exercises": [
                    {
                        "exerciseType": "cycling",
                        "subcategory": "cardio",
                        "totalDuration": 180,
                        "totalSets": 0,
                        "totalReps": 0,
                        "averageWeightLifted": 0
                    }
                ]
            }
        ]

        # Expected result
        expected_result = [
            {
                "username": "user1",
                "exercises": [
                    {
                        "exerciseType": "running",
                        "subcategory": "cardio",
                        "totalDuration": 120,
                        "totalSets": 0,
                        "totalReps": 0,
                        "averageWeightLifted": 0
                    },
                    {
                        "exerciseType": "weightlifting",
                        "subcategory": "strength",
                        "totalDuration": 60,
                        "totalSets": 3,
                        "totalReps": 10,
                        "averageWeightLifted": 50
                    }
                ]
            },
            {
                "username": "user2",
                "exercises": [
                    {
                        "exerciseType": "cycling",
                        "subcategory": "cardio",
                        "totalDuration": 180,
                        "totalSets": 0,
                        "totalReps": 0,
                        "averageWeightLifted": 0
                    }
                ]
            }
        ]

        # Call the function
        result = aggregate_general_stats()

        # Assertions
        self.assertEqual(result, expected_result)
        collection.aggregate.assert_called_with([
            {"$group": {
                "_id": {"username": "$username", "exerciseType": "$exerciseType", "subcategory": "$subcategory"},
                "totalDuration": {"$sum": "$duration"},
                "totalSets": {"$sum": "$sets"},
                "totalReps": {"$sum": "$reps"},
                "averageWeightLifted": {"$avg": "$weightLifted"}
            }},
            {"$group": {
                "_id": "$_id.username",
                "exercises": {"$push": {
                    "exerciseType": "$_id.exerciseType",
                    "subcategory": "$_id.subcategory",
                    "totalDuration": "$totalDuration",
                    "totalSets": "$totalSets",
                    "totalReps": "$totalReps",
                    "averageWeightLifted": "$averageWeightLifted"
                }}
            }},
            {"$project": {
                "username": "$_id",
                "exercises": 1,
                "_id": 0
            }}
        ])

if __name__ == '__main__':
    unittest.main()