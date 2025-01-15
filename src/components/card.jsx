import React, { useState } from 'react';
import '../styles/card.css';

//create a functional component UserEntries
export default function UserEntries() {
  //set up state with empty strings
  const [exercise, setExercise] = useState(''); //useRef
  const [time, setTime] = useState(0);
  const [fluidIntake, setFluidIntake] = useState(0);
  const [hoursSlept, setHoursSlept] = useState(0);

  //array of exercise options to iterate through
  const exercises = [
    'Running',
    'Swimming',
    'Yoga',
    'Cycling',
    'Weightlifting',
    'other',
  ];

  const handleSubmit = async (event) => {
    //prevent default form submission behavior/reloading the page
    event.preventDefault();
    //object with current values of each piece of state to be sent to backend
    const data = { exercise, time, fluidIntake, hoursSlept };

    try {
      const response = await fetch('http://localhost:5173/habitstracker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Data submitted successfully');
        //react router to navigate to another page after submission if successful
      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };
  //render the component
  return (
    //return a div container for the workout entry form & a form
    <div className='workout-entry'>
      <form onSubmit={handleSubmit}>
        {/* First Row: Exercise dropdown and time input */}
        <div className='row'>
          <label className='inline'>
            <span className='label-text'>Exercise:</span>
            <select
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
            >
              <option value='' disabled>
                Select an exercise
              </option>
              {/* Populate options from exercises array */}
              {exercises.map((ex, index) => (
                <option key={index} value={ex}>
                  {ex}
                </option>
              ))}
            </select>
          </label>
          {/* LABEL and <input> for time in minutes */}
          <label>
            Time (minutes)
            <input
              type='number'
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              placeholder='Enter time'
              required
            />
          </label>
        </div>
        {/* Static text label for "Mental Health" */}
        <div className='row'>
          <label className='inline'>
            <span className='label-text'>Mental Health:</span>
            <div className='static-box'>Meditation</div>
          </label>
          {/* LABEL and <input> for time in minutes */}
          <label>
            Time (minutes)
            <input
              type='number'
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              placeholder='Enter time'
              required
            />
          </label>
        </div>
        {/* Static text label for "Hydration" */}
        <div className='row'>
          <label className='inline'>
            <span className='label-text'>Hydration:</span>
            <div className='static-box'>Water Intake</div>
          </label>
          {/* LABEL and <input> for ml or oz*/}
          <label>
            Amount (ml or oz)
            <input
              type='number'
              value={fluidIntake}
              onChange={(e) => setTime(Number(e.target.value))}
              placeholder='Enter fluid intake'
              required
            />
          </label>
        </div>
        {/* Static text label for "Sleep hygiene" */}
        <div className='row'>
          <label className='inline'>
            <span className='label-text'>Sleep:</span>
            <div className='static-box'>Time Slept</div>
          </label>
          {/* LABEL and <input> for hours slept*/}
          <label>
            <span className='label-text'>Time (hours)</span>
            <input
              type='number'
              value={hoursSlept}
              onChange={(e) => setTime(Number(e.target.value))}
              placeholder='Enter time slept'
              required
            />
          </label>
        </div>
      </form>
      {/* // <button> to submit the form*/}
      <button className='submit' type='submit'>
        Submit
      </button>
    </div>
  );
}
