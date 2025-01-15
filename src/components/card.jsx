import React, { useState } from 'react';
import '../styles/card.css';

//create a functional component UserEntries
export default function UserEntries() {
  //set up state with empty strings
  const [exercise, setExercise] = useState(''); //useRef
  const [time, setTime] = useState(0);
  //array of exercise options to iterate through
  const exercises = [
    'Running',
    'Swimming',
    'Yoga',
    'Cycling',
    'Weightlifting',
    'other',
  ];

  const handleSubmit = (event) => {
    //prevent default form submission behavior
    event.preventDefault();
    //log the submitted data
    console.log(`Exercise: ${exercise}, Time: ${time} minutes`);
  };
  //render the component
  return (
    //return a div container for the workout entry form & a form
    <div className='workout-entry'>
      <form onSubmit={handleSubmit}>
        <label>
          Select Exercise:
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
          Time(minutes)
          <input
            type='number'
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            placeholder='Enter time'
            required
          />
        </label>
        {/* <button> to submit the form */}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
