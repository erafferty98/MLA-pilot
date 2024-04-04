const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Represents the user preferences schema.
 *
 * @typedef {Object} UserPreferencesSchema
 * @property {string} username - The username of the user.
 * @property {string} goal - The user's fitness goal.
 * @property {string} fitnessLevel - The user's fitness level.
 * @property {string} availableTime - The user's available time for exercise.
 * @property {string} workoutSchedule - The user's preferred workout schedule.
 * @property {string} equipment - The user's available equipment.
 * @property {string} limitations - The user's limitations.
 * @property {string} feedback - The user's feedback.
 * @property {Date} createdAt - The timestamp when the user preferences were created.
 * @property {Date} updatedAt - The timestamp when the user preferences were last updated.
 */

const userPreferencesSchema = new Schema(
  {
    username: { type: String, required: true },
    goal: { type: String },
    fitnessLevel: { type: String },
    availableTime: { type: String },
    workoutSchedule: { type: String },
    equipment: { type: String },
    limitations: { type: String },
    feedback: { type: String },
    routine: { type: String },
  },
  { timestamps: true } // This enables automatic creation of createdAt and updatedAt fields
);

const UserPreferences = mongoose.model('UserPreferences', userPreferencesSchema);

module.exports = UserPreferences;