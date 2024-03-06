import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ExerciseModal = ({ show, handleClose, exercise, userId }) => {
  const [sets, setSets] = useState([]);

  // Static placeholders - Replace with dynamic content from your backend or content management system
  const exerciseIntroduction = "Aqui vai uma breve introdução sobre o exercício, como executá-lo corretamente, e os benefícios.";
  const anatomyInformation = "Informações anatômicas específicas relacionadas ao exercício serão exibidas aqui.";

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
        series: sets.map(set => set.reps), // assuming 'series' is an array of reps
        repeticoes: sets.map(set => set.weight), // assuming 'repeticoes' is an array of weights
      };

      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        console.log('Treino salvo com sucesso');
        handleClose();
      } else {
        console.error('Falha ao salvar treino');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Introdução</h5>
        <p>{exerciseIntroduction}</p>
        <h5>Anatomia Relacionada</h5>
        <p>{anatomyInformation}</p>
        {/* Iterate over sets and render input fields for reps and weight */}
        {sets.map((set, index) => (
          <Form.Group key={index}>
            <Form.Label>Série {index + 1}</Form.Label>
            <Form.Control
              type="number"
              placeholder="Repetições"
              value={set.reps}
              onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
            />
            <Form.Control
              type="number"
              placeholder="Peso"
              value={set.weight}
              onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
            />
          </Form.Group>
        ))}
        <Button onClick={addSet}>Adicionar Série</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
        <Button variant="primary" onClick={saveWorkout}>Salvar Treino</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
