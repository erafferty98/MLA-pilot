import unittest
from calculations import *

if __name__ == '__main__':
    unittest.main()

class CalculationsTests(unittest.TestCase):
    def test_calculate_tdee_sedentary(self):
        # Test with sedentary activity level
        bmr = 1500
        activity_level = 'sedentary'
        expected_tdee = 1500 * 1.2

        result = calculate_tdee(bmr, activity_level)

        self.assertEqual(result, expected_tdee)

    def test_calculate_tdee_lightly_active(self):
        # Test with lightly active activity level
        bmr = 1500
        activity_level = 'lightly active'
        expected_tdee = 1500 * 1.375

        result = calculate_tdee(bmr, activity_level)

        self.assertEqual(result, expected_tdee)

    # Add more test cases for other activity levels...

    def test_convert_units_metric(self):
        # Test with metric units
        weight = 70
        height = 1.75
        unit = 'metric'
        expected_weight = 70
        expected_height = 1.75

        result_weight, result_height = convert_units(weight, height, unit)

        self.assertEqual(result_weight, expected_weight)
        self.assertEqual(result_height, expected_height)

    def test_convert_units_imperial(self):
        # Test with imperial units
        weight = 154
        height = 68
        unit = 'imperial'
        expected_weight = 69.853768
        expected_height = 1.7272

        result_weight, result_height = convert_units(weight, height, unit)

        self.assertAlmostEqual(result_weight, expected_weight, places=6)
        self.assertAlmostEqual(result_height, expected_height, places=4)

    def test_calculate_tdee_sedentary(self):
        # Test with sedentary activity level
        bmr = 1500
        activity_level = 'sedentary'
        expected_tdee = 1500 * 1.2

        result = calculate_tdee(bmr, activity_level)

        self.assertEqual(result, expected_tdee)

    def test_calculate_tdee_lightly_active(self):
        # Test with lightly active activity level
        bmr = 1500
        activity_level = 'lightly active'
        expected_tdee = 1500 * 1.375

        result = calculate_tdee(bmr, activity_level)

        self.assertEqual(result, expected_tdee)

    def test_calculate_water_intake_sedentary_temperate(self):
        # Test with sedentary activity level and temperate climate
        weight_kg = 70
        activity_level = 'sedentary'
        climate = 'temperate'
        expected_water_intake = 70 * 30

        result = calculate_water_intake(weight_kg, activity_level, climate)

        self.assertEqual(result, expected_water_intake)

    def test_calculate_water_intake_moderately_active_temperate(self):
        # Test with moderately active activity level and temperate climate
        weight_kg = 70
        activity_level = 'moderately active'
        climate = 'temperate'
        expected_water_intake = 70 * 30 * 1.2

        result = calculate_water_intake(weight_kg, activity_level, climate)

        self.assertEqual(result, expected_water_intake)

    def test_calculate_water_intake_active_temperate(self):
        # Test with active activity level and temperate climate
        weight_kg = 70
        activity_level = 'active'
        climate = 'temperate'
        expected_water_intake = 70 * 30 * 1.5

        result = calculate_water_intake(weight_kg, activity_level, climate)

        self.assertEqual(result, expected_water_intake)

    def test_calculate_water_intake_sedentary_hot(self):
        # Test with sedentary activity level and hot climate
        weight_kg = 70
        activity_level = 'sedentary'
        climate = 'hot'
        expected_water_intake = 70 * 30 * 1.2

        result = calculate_water_intake(weight_kg, activity_level, climate)

        self.assertEqual(result, expected_water_intake)

    def test_calculate_water_intake_moderately_active_hot(self):
        # Test with moderately active activity level and hot climate
        weight_kg = 70
        activity_level = 'moderately active'
        climate = 'hot'
        expected_water_intake = 70 * 30 * 1.2 * 1.2

        result = calculate_water_intake(weight_kg, activity_level, climate)

        self.assertEqual(result, expected_water_intake)

    def test_calculate_water_intake_active_hot(self):
        # Test with active activity level and hot climate
        weight_kg = 70
        activity_level = 'active'
        climate = 'hot'
        expected_water_intake = 70 * 30 * 1.5 * 1.2

        result = calculate_water_intake(weight_kg, activity_level, climate)

        self.assertEqual(result, expected_water_intake)

    def test_calculate_bmr_male(self):
        # Test calculate_bmr with male gender
        weight = 70
        height = 180
        age = 30
        gender = 'male'
        expected_bmr = 10 * weight + 6.25 * height - 5 * age + 5

        result = calculate_bmr(weight, height, age, gender)

        self.assertEqual(result, expected_bmr)

    def test_calculate_bmr_female(self):
        # Test calculate_bmr with female gender
        weight = 60
        height = 160
        age = 25
        gender = 'female'
        expected_bmr = 10 * weight + 6.25 * height - 5 * age - 161

        result = calculate_bmr(weight, height, age, gender)

        self.assertEqual(result, expected_bmr)

    def test_calculate_tdee_sedentary(self):
        # Test with sedentary activity level
        bmr = 1500
        activity_level = 'sedentary'
        expected_tdee = 1500 * 1.2

        result = calculate_tdee(bmr, activity_level)

        self.assertEqual(result, expected_tdee)

    def test_calculate_tdee_lightly_active(self):
        # Test with lightly active activity level
        bmr = 1500
        activity_level = 'lightly active'
        expected_tdee = 1500 * 1.375

        result = calculate_tdee(bmr, activity_level)

        self.assertEqual(result, expected_tdee)

    # Add more test cases for other activity levels...

    def test_calculate_ipf_points_male(self):
        # Test calculate_ipf_points with male gender
        body_weight_kg = 80
        total_lifted_kg = 500
        gender = 'male'
        expected_ipf_points = 500 / (-216.0475144 + 16.2606339 * body_weight_kg - 0.002388645 * pow(body_weight_kg, 2) - 0.00113732 * pow(body_weight_kg, 3) + 7.01863E-06 * pow(body_weight_kg, 4) - 1.291E-08 * pow(body_weight_kg, 5)) * total_lifted_kg

        result = calculate_ipf_points(body_weight_kg, total_lifted_kg, gender)

        self.assertEqual(result, expected_ipf_points)

    def test_calculate_ipf_points_female(self):
        # Test calculate_ipf_points with female gender
        body_weight_kg = 60
        total_lifted_kg = 400
        gender = 'female'
        expected_ipf_points = 500 / (594.31747775582 - 27.23842536447 * body_weight_kg + 0.82112226871 * pow(body_weight_kg, 2) - 0.00930733913 * pow(body_weight_kg, 3) + 4.731582E-05 * pow(body_weight_kg, 4) - 9.054E-08 * pow(body_weight_kg, 5)) * total_lifted_kg

        result = calculate_ipf_points(body_weight_kg, total_lifted_kg, gender)

        self.assertEqual(result, expected_ipf_points)

if __name__ == '__main__':
    unittest.main()