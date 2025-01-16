import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const habitSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    habits: {
      water: {
        value: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          enum: ['ml', 'oz'],
          required: true,
        },
      },
      exercise: {
        value: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          enum: ['minutes', 'hours'],
          required: true,
        },
      },
      sleep: {
        value: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          enum: ['hours'],
          required: true,
        },
      },
      meditation: {
        value: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          enum: ['minutes'],
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
