const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatbotPreferencesSchema = new Schema({
    username: { type: String, required: true, unique: true }, // Username to uniquely identify the user
    goal: String, // User's fitness goal
    fitness_level: String, // User's self-assessed fitness level
    equipment_available: String, // Equipment the user has available for workouts
    limitations: String, // Any physical or time limitations
    workout_duration: String, // Preferred duration of workouts
    user_workout_schedule: String, // Preferred workout days or times
    user_feedback: String, // Feedback on the exercises or chatbot interaction
  }, {
    timestamps: true, // Automatically manage createdAt and updatedAt timestamps
  });

  const ChatbotPreferences = mongoose.model('ChatbotPreferences', chatbotPreferencesSchema);

  module.exports = ChatbotPreferences;