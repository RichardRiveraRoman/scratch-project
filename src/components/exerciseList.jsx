/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import ExerciseCard from './exerciseCard';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const fetchExercise = async () => {
    // //getting token
    // const token = localStorage.getItem('token');
    console.log('in fetch data');
    try {
      const response = await fetch(`${config.baseURL}/exercise`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          //   Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        //toast
        console.error('Failed to fetch todos');
      }
      const exercises = await response.json();
      setExercises(exercises);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  const deleteExercise = (id) => {
    console.log('Delete exercise:', id);
  };

  const updateExercise = (id) => {
    console.log('Update exercise:', id);
  };
  useEffect(() => {
    fetchExercise();
  }, []);

  return (
    <div>
      <h1>My Exercises</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            onDelete={deleteExercise}
            onUpdate={updateExercise}
          />
        ))}
      </div>
    </div>
  );
};

export default ExerciseList;
