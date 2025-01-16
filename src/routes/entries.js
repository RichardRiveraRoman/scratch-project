const express = require('express');
const router = express.Router();
const Entry = require(''); //path to model/schema

router.post('./components/card', async (req, res) => {
  try {
    const { exercise, time, fluidIntake, hoursSlept } = req.body;
    const newEntry = { exercise, time, fluidIntake, hoursSlept };
    await newEntry.save();
    res.status(201).json({ message: 'Entry saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

module.exports = router;
