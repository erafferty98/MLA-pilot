const mongoose = require('mongoose');
const { Schema } = mongoose;

// /**
//  * Represents the exercise schema.
//  *
//  * @typedef {Object} ExerciseSchema
//  * @property {string} username - The username of the user performing the exercise.
//  * @property {string} exerciseType - The type of exercise. Can be one of: 'Running', 'Cycling', 'Swimming', 'Gym', 'Other'.
//  * @property {string} [subcategory] - The subcategory of the exercise. Only required for Gym exercises. Can be one of: 'Squat', 'Bench Press', 'Deadlift', 'Overhead Press', 'Bent Over Row', 'Other'.
//  * @property {string} [description] - The description of the exercise.
//  * @property {number} duration - The duration of the exercise in minutes.
//  * @property {Date} date - The date of the exercise.
//  * @property {number} [sets] - The number of sets performed. Only required for Gym exercises.
//  * @property {number} [reps] - The number of reps performed. Only required for Gym exercises.
//  * @property {number} [weightLifted] - The weight lifted during the exercise. Only required for Gym exercises.
//  * @property {Date} createdAt - The timestamp when the exercise was created.
//  * @property {Date} updatedAt - The timestamp when the exercise was last updated.
//  */

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    exerciseType: {
      type: String,
      required: true,
      enum: ['Running', 'Cycling', 'Swimming', 'Gym', 'Other']
    },
    subcategory: { 
      type: String, 
      required: false, 
      enum: ['Squat','Bench Press','Deadlift','Overhead Press','Bent Over Row', 'Other Weightlifting'] }, // Optional field for Gym exercises
    description: { type: String, required: false },
    description: { type: String, required: false },
    duration: { 
        type: Number, 
        required: true,
        validate: {
            validator: Number.isInteger,
            message: 'Duration should be an integer.'
        },
        min: [1, 'Duration should be positive.']
    },
    date: { type: Date, required: true },
    sets: {
      type: Number,
      required: false, // Only required for Gym exercises
      min: [1, 'Sets should be positive.'],
      validate: {
          validator: Number.isInteger,
          message: 'Sets should be an integer.'
      }
    },
    reps: {
      type: Number,
      required: false, // Only required for Gym exercises
      min: [1, 'Reps should be positive.'],
      validate: {
          validator: Number.isInteger,
          message: 'Reps should be an integer.'
      }
    },
    weightLifted: {
      type: Number,
      required: false, // Only required for Gym exercises
      min: [0, 'Weight lifted should be non-negative.']
    },
  },
  { timestamps: true }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
