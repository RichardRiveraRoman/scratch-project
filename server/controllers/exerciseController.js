import Exercise from '../models/exerciseModel.js';

const exerciseController = {};

exerciseController.getAllExercises = async (req, res) => {
  const userId = req.userId;
  console.log('getAllExercises', userId);

  try {
    const exercises = await Exercise.find({ userId });
    return res.status(200).json(exercises);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error fetching Exercises', error: error.message });
  }
};

exerciseController.createExercise = async (req, res) => {
  try {
    const { type, distance, duration, date, caloriesBurned } = req.body;
    console.log('in createExercise', {
      type,
      distance,
      duration,
      date,
      caloriesBurned,
    });

    // Validate required fields
    if (!type || !duration) {
      return res.status(400).json({ error: 'Type and duration are required' });
    }
    // Create new exercise
    const exercise = await Exercise.create({
      type,
      distance,
      duration,
      date,
      caloriesBurned,
      userId: '678449e8240629f7a64dce95',
      // userId: req.user.username, // Assuming `username` is in the JWT payload
    });

    res
      .status(201)
      .json({ message: 'Exercise created successfully', exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
};

exerciseController.updateExercise = async (req, res) => {
  const { id } = req.params;
  const { type, distance, duration, date, caloriesBurned } = req.body;
  console.log('in updateExercise: ', id, {
    type,
    distance,
    duration,
    date,
    caloriesBurned,
  });
  try {
    // Validate required fields
    if (!type || !duration) {
      return res.status(400).json({ error: 'Type and duration are required' });
    }
    const exerciseUpdated = await Exercise.findByIdAndUpdate(
      id,
      { type, distance, duration, date, caloriesBurned },
      { new: true },
    );
    if (!exerciseUpdated) {
      res.status(404).json({ error: 'Failed to Update exercise' });
    }
    res.status(200).json('Exercise is updated successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Update exercise' });
  }
};

exerciseController.deleteExercise = async (req, res) => {
  const { id } = req.params;
  console.log('in deleteExercise: ', id);

  try {
    const exerciseDeleted = await Exercise.findByIdAndDelete(id);
    if (!exerciseDeleted) {
      res.status(404).json({ error: 'Failed to delete exercise' });
    }
    res.status(200).json('Exercise is delete successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
};
export default exerciseController;
