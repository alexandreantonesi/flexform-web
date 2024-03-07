import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ExerciseModal from './ExerciseModal';
import ExerciseItem from './ExerciseItem';

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

  import React, { useState, useEffect } from 'react';
  import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
  import { format } from 'date-fns';
  import pt from 'date-fns/locale/pt';
  import ExerciseModal from './ExerciseModal';
  import ExerciseItem from './ExerciseItem';
  
  import React, { useState, useEffect } from 'react';
  import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
  import { format } from 'date-fns';
  import pt from 'date-fns/locale/pt';
  import ExerciseModal from './ExerciseModal';
  import ExerciseItem from './ExerciseItem';
  
  const ExercisePage = () => {
    const [todaysExercises, setTodaysExercises] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
  
    useEffect(() => {
      // Assuming getTodaysExercises is a function that returns the exercises based on the day
      setTodaysExercises(getTodaysExercises(selectedDay));
    }, [selectedDay]);
  
    const handleDaySelect = (eventKey) => {
      setSelectedDay(eventKey);
    };
  
    const handleAutoSelect = () => {
      setSelectedDay('');
    };
  
    const daysOfWeek = ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'];
  
    return (
      <div className="m-3">
        <DropdownButton id="day-select-dropdown" title={selectedDay || 'Selecionar Dia'} onSelect={handleDaySelect}>
          {daysOfWeek.map(day => (
            <Dropdown.Item key={day} eventKey={day}>
              {format(new Date(), 'EEEE', { locale: pt })[day]}
            </Dropdown.Item>
          ))}
          <Dropdown.Item eventKey="" onSelect={handleAutoSelect}>
            Detecção Automática
          </Dropdown.Item>
        </DropdownButton>
        <h2>Exercícios para hoje - {selectedDay ? format(new Date(), 'EEEE', { locale: pt })[selectedDay] : format(new Date(), 'EEEE', { locale: pt })}</h2>
        <ListGroup>
          {todaysExercises.length > 0 ? (
            todaysExercises.map((exercise, index) => (
              <ExerciseItem key={index} exercise={exercise} />
            ))
          ) : (
            <p>Descanso ou dia não definido</p>
          )}
        </ListGroup>
      </div>
    );
  }; 

const [manualDay, setManualDay] = useState('');

const handleDaySelect = (day) => {
  setManualDay(day);
};

const handleAutoSelect = () => {
  setManualDay('');
};

const getTodaysExercises = (selectedDay) => {
  const dayMap = {
    'Monday': 'push',
    'Tuesday': 'pull',
    'Thursday': 'legs',
    'Friday': 'push',
    'Saturday': 'pull',
  };

  return exercisesByDay[dayMap[selectedDay]] || [];
};

export default ExercisePage;