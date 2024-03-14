import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ArrowLeftCircle } from 'react-bootstrap-icons';

// Import all your muscle icons here
import sternocostal_head_chestIcon from '../assets/icons/muscles/sternocostal_head_chest.png';
import clavicular_head_chestIcon from '../assets/icons/muscles/clavicular_head_chest.png';
import tricepsIcon from '../assets/icons/muscles/triceps.png';
import deltoidIcon from '../assets/icons/muscles/deltoid.png';
// ... other imports

// This object maps muscle names to their respective icons
const muscleIcons = {
  'cabeça esternocostal do peitoral maior': sternocostal_head_chestIcon,
  'cabeça clavicular do peitoral maior': clavicular_head_chestIcon,
  'tríceps': tricepsIcon,
  'deltoides anteriores': deltoidIcon,
  // ... other mappings
};

const ExerciseStartPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { exercise } = state || {};

  if (!exercise) {
    navigate('/exercicios');
    return null;
  }

  // Function to handle the "Começar Exercício" button click
  const handleStartExercise = () => {
    console.log('Starting exercise:', exercise.name);
    // Here you would add the code to interact with the Arduino or start the exercise logic
  };

  // Function to handle the "Ver Tutorial" button click
  const handleShowTutorial = () => {
    console.log('Showing tutorial for:', exercise.name);
    // Here you would add the code to show the tutorial for the exercise
  };

  // This function returns an array of JSX elements, each one being an image tag for the muscle icon
  const muscleIconsElements = exercise.muscles.split(', ').map((muscle, index) => {
    const icon = muscleIcons[muscle.toLowerCase()]; // Get the icon based on the muscle name
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
      <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'space-around', maxWidth: '500px', margin: 'auto' }}>
        <Button variant="primary" size="lg" onClick={handleStartExercise}>
          Começar Exercício
        </Button>
        <Button variant="secondary" size="lg" style={{ marginLeft: '30px' }} onClick={handleShowTutorial}>
          Ver Tutorial
        </Button>
      </div>
    </div>
  );
};

export default ExerciseStartPage;
