const express = require('express');
const router = express.Router();
// Updated to use the renamed model that reflects its purpose
const ChatbotPreferences = require('../models/chatbot.model');

// POST: Handle ChatGPT chatbot responses and save user information
router.post('/', async (req, res) => {
  try {
    const {
      username, // Capture the username from the request
      goal,
      fitness_level,
      equipment_available,
      limitations,
      workout_duration,
      user_workout_schedule,
      user_feedback
    } = req.body;

    // Only proceed if a username is provided
    if (username) {
      // Create a new ChatbotPreferences document to save user information
      const newPreference = new ChatbotPreferences({
        username, // Use the provided username
        goal,
        fitness_level,
        equipment_available,
        limitations,
        workout_duration,
        user_workout_schedule,
        user_feedback
      });

      // Save the new ChatbotPreferences document
      await newPreference.save();
      res.json({ message: 'User information saved successfully!' });
    } else {
      // Handle cases where no username is provided
      res.status(400).json({ message: 'Username is required to save user information.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving user information' });
  }
});

module.exports = router;
