// ExercisePage.js
import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { format, isMonday, isTuesday, isThursday, isFriday, isSaturday } from 'date-fns';
import pt from 'date-fns/locale/pt';

const exercisesByDay = {
    push: [
      { name: 'Supino com Halteres', muscles: 'Cabeça esternocostal do peitoral maior, tríceps, deltoides anteriores' },
      { name: 'Peck Deck', muscles: 'Cabeça esternocostal do peitoral maior, tríceps, deltoides anteriores' },
      { name: 'Elevação Frontal com Cabo', muscles: 'Cabeça clavicular do peitoral maior, deltoides anteriores' },
      { name: 'Supino Inclinado com Halteres', muscles: 'Cabeça clavicular do peitoral maior, tríceps, deltoides anteriores' }
    ],
    pull: [
      { name: 'Rosca com Cabo', muscles: 'Bíceps, braquial' },
      { name: 'Rosca Direta', muscles: 'Bíceps, braquial' },
      { name: 'Rosca Scott', muscles: 'Cabeça curta do bíceps, braquial' },
      { name: 'Rosca Inclinada', muscles: 'Cabeça longa do bíceps, braquial' },
      { name: 'Remada em T', muscles: 'Músculos das costas' },
      { name: 'Pulldown', muscles: 'Músculos das costas' },
      { name: 'Remada Sentada', muscles: 'Músculos das costas' },
      { name: 'Voador Inverso', muscles: 'Deltoides posteriores' }
    ],
    legs: [
      { name: 'Agachamento', muscles: 'Músculos das pernas' },
      { name: 'Prensa de Pernas', muscles: 'Músculos das pernas' },
      { name: 'Extensão de Pernas', muscles: 'Músculos das pernas' },
      { name: 'Flexão de Pernas', muscles: 'Músculos das pernas' }
    ],
  };
  
  const getTodaysExercises = () => {
    const today = new Date();
    if (isMonday(today) || isFriday(today)) {
      return exercisesByDay.push;
    } else if (isTuesday(today) || isSaturday(today)) {
      return exercisesByDay.pull;
    } else if (isThursday(today)) {
      return exercisesByDay.legs;
    } else {
      return []; // Rest days or undefined days
    }
  };  

const ExerciseModal = ({ show, handleClose, exercise }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{exercise.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* You can include more detailed information or video here */}
        <p>{exercise.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          // Logic to start exercise routine
        }}>
          Start Routine
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ExerciseItem = ({ exercise }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ListGroup.Item action onClick={() => setShowModal(true)}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5>{exercise.name}</h5>
            <p>Músculos envolvidos: {exercise.muscles}</p>
          </div>
          <Button variant="primary">Iniciar</Button>
        </div>
      </ListGroup.Item>

      <ExerciseModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        exercise={exercise}
      />
    </>
  );
};

const ExercisePage = () => {
  const [todaysExercises, setTodaysExercises] = useState([]);

  useEffect(() => {
    setTodaysExercises(getTodaysExercises());
  }, []);

  return (
    <div className="m-3">
      <h2>Exercícios para hoje - {format(new Date(), 'EEEE', { locale: pt })}</h2>
      <ListGroup>
        {todaysExercises.length > 0 ? todaysExercises.map((exercise, index) => (
          <ExerciseItem key={index} exercise={exercise} />
        )) : <p>Descanso ou dia não definido</p>}
      </ListGroup>
    </div>
  );
};

export default ExercisePage;
