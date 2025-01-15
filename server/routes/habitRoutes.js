import express from 'express';
import mongoose from 'mongoose';
import Habit from '../models/habitModel.js';

const router = express.Router();

// Fetch all habits
/*
router.get('/', async (req, res) => {
  try {
    // Example: req.body = { water: { value: 30, unit: 'ml' } }
    // gets user id from the request object
    // const userId = new mongoose.Types.ObjectId(req.userId); // Convert to ObjectId

    const habits = await Habit.find({ user: userId });

    console.log('Logging habits response object \n', habits);
  } catch (err) {
    console.log('Failed to fetch habits', err);
    return res.status(500).json({ error: 'Failed to fetch your habits' });
  }
});
*/

// Post a new habit
router.post('/', async (req, res) => {
  try {
    const { habits } = req.body;
    console.log('Logging habits object \n', habits);

    // const habit = await Habit.create({ ...habits, user: req.userId });
    const habit = await Habit.create({ habits });
    return res.status(201).json({ habit });
  } catch (err) {
    console.log('Failed to create a new habit', err);
    return res.status(500).json({ error: 'Failed to create a new habit' });
  }
});

// Update a habit
/*
router.put('/', async (req, res) => {
  try {
  } catch (err) {
    console.log('Failed to update habit', err);
    return res.status(500).json({ error: 'Failed to update habit' });
  }
});
*/

/*
// Delete a habit
router.delete('/', async (req, res) => {
  try {
  } catch (err) {
    console.log('Failed to delete habit', err);
    return res.status(500).json({ error: 'Failed to delete habit' });
  }
});
*/

export default router;
