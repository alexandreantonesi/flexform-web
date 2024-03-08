import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format, startOfWeek, addDays } from 'date-fns';
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
  rest: []
};

const ExercisePage = () => {
  const [todaysExercises, setTodaysExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    if (!selectedDay) {
      handleAutoSelect(); // Set today's exercises when the component mounts
    } else {
      setTodaysExercises(getTodaysExercises(selectedDay));
    }
  }, [selectedDay]);

  const handleDaySelect = (eventKey) => {
    setSelectedDay(eventKey);
  };

  const handleAutoSelect = () => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    const dayMap = {
      'segunda-feira': 'Monday',
      'terça-feira': 'Tuesday',
      'quarta-feira': 'rest',
      'quinta-feira': 'Thursday',
      'sexta-feira': 'Friday',
      'sábado': 'Saturday',
      'domingo': 'rest',
    };
    const englishDay = dayMap[todayFormatted.toLowerCase()];
    setSelectedDay(englishDay);
  };

  const dayMap = {
    'monday': 'segunda-feira',
    'tuesday': 'terça-feira',
    'wednesday': 'quarta-feira',
    'thursday': 'quinta-feira',
    'friday': 'sexta-feira',
    'saturday': 'sábado',
    'sunday': 'domingo',
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayNames = daysOfWeek.map(day => dayMap[day.toLowerCase()]);

  return (
    <div className='m-3'>
      <DropdownButton id='day-select-dropdown' title={selectedDay ? dayMap[selectedDay.toLowerCase()] : 'Selecionar Dia'} onSelect={handleDaySelect}>
        {dayNames.map((dayName, index) => (
          <Dropdown.Item key={index} eventKey={daysOfWeek[index].toLowerCase()}>
            {dayName}
          </Dropdown.Item>
        ))}
        <Dropdown.Item eventKey='' onSelect={handleAutoSelect}>
          Detecção Automática
        </Dropdown.Item>
      </DropdownButton>
      <h2>Exercícios para hoje - {selectedDay ? dayMap[selectedDay.toLowerCase()] : 'Hoje'}</h2>
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

const getTodaysExercises = (day) => {
  const normalizedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase(); // Make sure the day matches the case of the keys in dayMap
  
  const dayMap = {
    'Monday': 'push',
    'Tuesday': 'pull',
    'Wednesday': 'rest',
    'Thursday': 'legs',
    'Friday': 'push',
    'Saturday': 'pull',
    'Sunday': 'rest',
  };

  return exercisesByDay[dayMap[normalizedDay]] || [];
};

export default ExercisePage;
