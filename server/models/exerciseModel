import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const exerciseSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'Running',
      'Walking',
      'Cycling',
      'Swimming',
      'Bodybuilding',
      'Other',
    ],
  },
  distance: {
    type: Number,
    required: false, // Distance is optional (e.g., for bodybuilding or swimming)
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  caloriesBurned: {
    type: Number,
    required: false,
    min: 0,
  },
  notes: {
    type: String,
    required: false,
    maxlength: 500,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who performed the exercise
    required: true,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;
