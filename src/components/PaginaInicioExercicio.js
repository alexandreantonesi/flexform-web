import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

import sternocostal_head_chestIcon from '../assets/icons/muscles/sternocostal_head_chest.png';
import clavicular_head_chestIcon from '../assets/icons/muscles/clavicular_head_chest.png';
import tricepsIcon from '../assets/icons/muscles/triceps.png';
import deltoidIcon from '../assets/icons/muscles/deltoid.png';

const muscleIcons = {
  'cabeça esternocostal do peitoral maior': sternocostal_head_chestIcon,
  'cabeça clavicular do peitoral maior': clavicular_head_chestIcon,
  'tríceps': tricepsIcon,
  'deltoides anteriores': deltoidIcon,
};

const ExerciseStartPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { exercise } = state || {};
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  
  useEffect(() => {
    if (!state || !state.exercise) {
      navigate('/exercicios');
    }
  }, [navigate, state]);
  

  if (!exercise) {
    navigate('/exercicios');
    return null;
  }

  const handleStartExercise = () => {
    console.log('exercicio inciiado:', exercise.name);
  };

  const handleShowTutorial = () => {
    console.log('a mostrar tutorial para:', exercise.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('exercicio:', exercise.name, 'Reps:', reps, 'Peso:', weight);
    setReps('');
    setWeight('');
  };

  const muscleIconsElements = exercise.muscles.split(', ').map((muscle, index) => {
    const icon = muscleIcons[muscle.toLowerCase()];
    return <img key={index} src={icon} alt={muscle} style={{ width: '50px', margin: '10px' }} />;
  });

  return (
    <div className="exercise-start-page" style={{ textAlign: 'center', marginTop: '50px' }}>
      <ArrowLeftCircle
        size={30}
        onClick={() => navigate(-1)}
        style={{ cursor: 'pointer', marginBottom: '20px' }}
      />
      <h2>{exercise.name}</h2>
      <div>
        <h4>Músculos envolvidos:</h4>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {muscleIconsElements}
        </div>
      </div>
      <Form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
        <InputGroup className="mb-3">
          <InputGroup.Text>Reps</InputGroup.Text>
          <FormControl
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            type="number"
            placeholder="Número de repetições"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Weight</InputGroup.Text>
          <FormControl
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            type="number"
            placeholder="Peso utilizado"
          />
        </InputGroup>
        <Button variant="success" type="submit">
          Marcar como concluído
        </Button>
      </Form>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', maxWidth: '500px', margin: 'auto' }}>
        <Button variant="primary" size="lg" onClick={handleStartExercise}>
          Iniciar exercício
        </Button>
        <Button variant="secondary" size="lg" style={{ marginLeft: '30px' }} onClick={handleShowTutorial}>
          Ver tutorial
        </Button>
      </div>
    </div>
  );
};

export default ExerciseStartPage;
