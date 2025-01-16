const express = require('express');
const router = express.Router();
const Entry = require(''); //path to model/schema

//post endpoint at components.card - might be wrong endpoint
router.post('./components/card', async (req, res) => {
  try {
    //Destructures the req.body object to extract the data sent in the body of the POST request
    const { exercise, time, fluidIntake, hoursSlept } = req.body;
    //Creates a new object called newEntry with the data extracted from the request body.
    const newEntry = new Entry({ exercise, time, fluidIntake, hoursSlept });
    //persist newEntry obj to database
    await newEntry.save();
    res.status(201).json({ message: 'Entry saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save entry' });
  }
});

module.exports = router;
