import Exercise from '../models/exerciseModel';

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

exerciseController.createEsercise = async (req, res) => {
  try {
    const { type, distance, duration, date, caloriesBurned } = req.body;
    console.log('in createEsercise', {
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
    const exercise = new Exercise({
      type,
      distance,
      duration,
      date,
      caloriesBurned,
      userId: '678449e8240629f7a64dce95',
      //   userId: req.user.username,
    });

    await exercise.save();

    res
      .status(201)
      .json({ message: 'Exercise created successfully', exercise });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
};

export default exerciseController;
