import express from 'express';
import Habit from '../models/habitModel.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Apply authentication middleware to all habit routes
router.use(authenticate);

// Get all habits for user
router.get('/', async (req, res) => {
  try {
    // gets user id from the request object
    const habits = await Habit.find({ userId: req.userId })
                             .sort({ createdAt: -1 });
    return res.status(200).json({ habits });
  } catch (err) {
    console.log('Failed to fetch habits', err);
    return res.status(500).json({ error: 'Failed to fetch habits' });
  }
});


// Post a new habit
router.post('/', async (req, res) => {
  try {
    const { habits } = req.body;
    
    // Validate all required fields are present with correct units
    if (!habits || 
        !validateHabit(habits.water, ['ml', 'oz']) ||
        !validateHabit(habits.exercise, ['minutes', 'hours']) ||
        !validateHabit(habits.sleep, ['hours']) ||
        !validateHabit(habits.meditation, ['minutes'])) {
      return res.status(400).json({ 
        error: 'All habits are required with valid values and units' 
      });
    }

    const habit = await Habit.create({
      userId: req.userId,
      habits
    });

    return res.status(201).json({ habit });
  } catch (err) {
    console.log('Failed to create a new habit', err);
    return res.status(500).json({ error: 'Failed to create a new habit' });
  }
});

// Update a habit entry
router.put('/:id', async (req, res) => {
  try {
    const { habits } = req.body;
    
    // Validate update data
    if (!habits || 
        !validateHabit(habits.water, ['ml', 'oz']) ||
        !validateHabit(habits.exercise, ['minutes', 'hours']) ||
        !validateHabit(habits.sleep, ['hours']) ||
        !validateHabit(habits.meditation, ['minutes'])) {
      return res.status(400).json({ 
        error: 'All habits are required with valid values and units' 
      });
    }

    const updatedHabit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { habits },
      { new: true }
    );

    if (!updatedHabit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    return res.status(200).json({ habit: updatedHabit });
  } catch (err) {
    console.log('Failed to update habit', err);
    return res.status(500).json({ error: 'Failed to update habit' });
  }
});

// Delete a habit entry
router.delete('/:id', async (req, res) => {
  try {
    const deletedHabit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!deletedHabit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    return res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (err) {
    console.log('Failed to delete habit', err);
    return res.status(500).json({ error: 'Failed to delete habit' });
  }
});

// Validation helper function
const validateHabit = (habit, allowedUnits) => {
  return habit &&
         typeof habit.value === 'number' &&
         habit.value >= 0 &&
         allowedUnits.includes(habit.unit);
}

export default router;
