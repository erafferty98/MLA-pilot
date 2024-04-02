import unittest
from unittest.mock import MagicMock
from datetime import datetime, timedelta
import logging

from stats_routes import weekly_user_stats

class StatsRoutesTests(unittest.TestCase):
    def setUp(self):
        # Mocking the request object
        self.request = MagicMock()

    def test_weekly_user_stats(self):
        # Mocking the request arguments
        self.request.args.get.side_effect = lambda arg: {
            'user': 'user1',
            'start': '2022-01-01',
            'end': '2022-01-07'
        }.get(arg)

        # Mocking the logging.info method
        logging.info = MagicMock()

        # Mocking the aggregate_weekly_stats function
        aggregate_weekly_stats = MagicMock(return_value={'running': 120, 'cycling': 240})
        
        # Expected result
        expected_result = {'stats': {'running': 120, 'cycling': 240}}

        # Call the function
        result = weekly_user_stats()

        # Assertions
        self.assertEqual(result, expected_result)
        self.request.args.get.assert_called_with('user')
        logging.info.assert_called_with("Fetching weekly stats for user: user1 from 2022-01-01 to 2022-01-08")
        aggregate_weekly_stats.assert_called_with('user1', datetime(2022, 1, 1), datetime(2022, 1, 8))

if __name__ == '__main__':
    unittest.main()