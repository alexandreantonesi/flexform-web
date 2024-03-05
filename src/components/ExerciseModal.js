import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ExerciseModal = ({ show, handleClose, exercise, userId }) => {
  const [sets, setSets] = useState([]);

  const addSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const handleSetChange = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = Number(value);
    setSets(updatedSets);
  };

  const saveWorkout = async () => {
    try {
      const workoutData = {
        id_usuario: userId,
        nome_exercicio: exercise.name,
        series: sets.length,
        repeticoes: sets.reduce((acc, set) => acc + set.reps, 0),
        peso: sets.reduce((acc, set) => acc + set.weight, 0) / sets.length,
      };
      
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        console.log('workout salvo com sucesso');
        handleClose();
      } else {
        console.error('erro ao salvar workout... triste');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {sets.map((set, index) => (
          <Form.Group key={index}>
            <Form.Label>Set {index + 1}</Form.Label>
            <Form.Control
              type="number"
              placeholder="Reps"
              value={set.reps}
              onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Weight"
              value={set.weight}
              onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
            />
          </Form.Group>
        ))}
        <Button onClick={addSet}>Add Set</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={saveWorkout}>Save Workout</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
