import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ExerciseModal = ({ show, handleClose, exercise, userId }) => {
  const [sets, setSets] = useState([]);
  const [showTutorial, setShowTutorial] = useState(false);

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
    // ... Existing save workout functionality ...
  };

  const handleStartExerciseClick = () => {
    setShowTutorial(true);
  };

  const startExercise = () => {
    console.log('Exercise started!');
    // Here you would add the code to interact with the Arduino or start the exercise logic
  };

  const renderExerciseTutorial = () => {
    // The content of your tutorial will go here. Replace placeholder text with actual instructions.
    return (
      <>
        <h5>Instruções do Exercício</h5>
        <p>{exerciseIntroduction}</p>
        <h5>Anatomia Relacionada</h5>
        <p>{anatomyInformation}</p>
        <Button variant="primary" onClick={startExercise}>Iniciar Exercício</Button>
      </>
    );
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showTutorial ? renderExerciseTutorial() : (
          <>
            <Button variant="primary" onClick={handleStartExerciseClick}>Começar Exercício</Button>
            {/* Render form to add sets here */}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Fechar</Button>
        <Button variant="primary" onClick={saveWorkout}>Salvar Treino</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExerciseModal;
