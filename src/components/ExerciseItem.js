import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'react-bootstrap';

const ExerciseItem = ({ exercise }) => {
  let navigate = useNavigate();
  
  const handleStartExercise = () => {
    // Navigate to the exercise start page and pass the exercise data
    navigate('/start-exercise', { state: { exercise } });
  };

  return (
    <ListGroupItem>
      <div className="exercise-item">
        <div className="exercise-info">
          <h4>{exercise.name}</h4>
          <p>{exercise.muscles}</p>
        </div>
        <Button variant="primary" onClick={handleStartExercise}>
          Iniciar
        </Button>
      </div>
    </ListGroupItem>
  );
};

export default ExerciseItem;
