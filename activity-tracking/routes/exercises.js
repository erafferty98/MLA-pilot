const express = require('express');
const router = express.Router();
const Exercise = require('../models/exercise.model');


// GET: Retrieve all exercises
router.get('/', async (req, res) => {
    try {
      const exercises = await Exercise.find();
      res.json(exercises);
    } catch (error) {
      res.status(400).json({ error: 'Error: ' + error.message });
    }
  });
  
// POST: Add a new exercise
router.post('/add', async (req, res) => {
  try {
    const { username, exerciseType, description, duration, date, subcategory, sets, reps, weightLifted } = req.body;

    const newExercise = new Exercise({
      username,
      exerciseType,
      description,
      duration: duration ? Number(duration) : undefined,
      date: date ? Date.parse(date) : undefined,
      subcategory, //optional
      sets: sets ? Number(sets) : undefined, //optional
      reps: reps ? Number(reps) : undefined, //optional
      weightLifted: weightLifted ? Number(weightLifted) : undefined, //optional
    });

    await newExercise.save();
    res.json({ message: 'Exercise added!' });
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// GET: Retrieve an exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.json(exercise);
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// DELETE: Delete an exercise by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.json({ message: 'Exercise deleted.' });
  } catch (error) {
    res.status(400).json({ error: 'Error: ' + error.message });
  }
});

// PUT: Update an exercise by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { username, exerciseType, description, duration, date, subcategory, sets, reps, weightLifted } = req.body;

    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    // Update fields if provided
    if (username) exercise.username = username;
    if (exerciseType) exercise.exerciseType = exerciseType;
    if (description) exercise.description = description;
    if (duration) exercise.duration = Number(duration);
    if (date) exercise.date = new Date(date);
    if (subcategory !== undefined) exercise.subcategory = subcategory; // Check for undefined to allow clearing the field
    if (sets !== undefined) exercise.sets = Number(sets); //optional
    if (reps !== undefined) exercise.reps = Number(reps); //optional
    if (weightLifted !== undefined) exercise.weightLifted = Number(weightLifted); //optional

    await exercise.save();
    res.json({ message: 'Exercise updated!', exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the exercise' });
  }
});
  
  module.exports = router;