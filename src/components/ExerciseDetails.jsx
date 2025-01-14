import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config';

const ExerciseDetails = () => {
  const { type } = useParams(); // Get type from route params
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${config.baseURL}/exercise/${type}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            //   Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          console.error('Failed to fetch todos');
        }
        const exercises = await response.json();
        setExercises(exercises);
      } catch (error) {
        console.error(`Error fetching ${type} exercises:`, error);
      }
    };

    fetchExercises();
  }, [type]);

  return (
    <div>
      <h1>{type} Exercises</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise._id}>
            {new Date(exercise.date).toLocaleDateString()} -{' '}
            {exercise.distance || 'N/A'} km, {exercise.duration} mins
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseDetails;
