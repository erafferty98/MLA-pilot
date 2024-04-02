import unittest
from calculations import calculate_1rm

class CalculationsTests(unittest.TestCase):
    def test_calculate_1rm(self):
        # Test case 1: reps = 5, weight = 100
        result = calculate_1rm(5, 100)
        self.assertAlmostEqual(result, 125.0, places=2)

        # Test case 2: reps = 10, weight = 80
        result = calculate_1rm(10, 80)
        self.assertAlmostEqual(result, 88.89, places=2)

        # Test case 3: reps = 3, weight = 120
        result = calculate_1rm(3, 120)
        self.assertAlmostEqual(result, 160.0, places=2)

        # Test case 4: reps = 1, weight = 200
        result = calculate_1rm(1, 200)
        self.assertAlmostEqual(result, 200.0, places=2)

if __name__ == '__main__':
    unittest.main()