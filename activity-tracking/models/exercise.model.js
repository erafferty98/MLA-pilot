const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    exerciseType: {
      type: String,
      required: true,
      enum: ['Running', 'Cycling', 'Swimming', 'Gym', 'Other']
    },
    subcategory: { type: String, required: false }, // Optional field for Gym exercises
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
