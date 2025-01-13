/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../styles/exerciseCard.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const ExerciseCard = ({ exercise, onUpdate, onDelete }) => {
  const { type, distance, duration, date, caloriesBurned, _id } = exercise;

  return (
    <Card className='exercise-card'>
      {/* Optional Image */}
      {/* <Card.Img variant='top' src='' alt={`${type} activity`} /> */}
      <Card.Body>
        <Card.Title>{type}</Card.Title>
        {/* <Card.Text>Track your {type.toLowerCase()} activity!</Card.Text> */}
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroup.Item>
          <strong>Distance:</strong> {distance ? `${distance} km` : 'N/A'}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Duration:</strong> {duration} mins
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Calories Burned:</strong>{' '}
          {caloriesBurned ? `${caloriesBurned} kcal` : 'N/A'}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button
          variant='primary'
          onClick={() => onUpdate(_id)}
          style={{ marginRight: '10px' }}
        >
          Update
        </Button>
        <Button variant='danger' onClick={() => onDelete(_id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ExerciseCard;
