import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

const ExerciseItem = ({ exercise }) => {
  // Define your state hooks and any other logic you need for this component

  return (
    <ListGroupItem>
      {/* Render your ExerciseItem content here */}
      <h5>{exercise.name}</h5>
      <p>Músculos envolvidos: {exercise.muscles}</p>
      {/* ... other ExerciseItem details ... */}
      <Button variant="primary">Iniciar</Button>
    </ListGroupItem>
  );
};

export default ExerciseItem;
