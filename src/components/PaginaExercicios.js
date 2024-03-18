import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ItemExercicio from './ItemExercicio';

const diasDisponiveis = 5;

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

const dayMap = {
  'Monday': 'segunda-feira',
  'Tuesday': 'terça-feira',
  'Wednesday': 'quarta-feira',
  'Thursday': 'quinta-feira',
  'Friday': 'sexta-feira',
  'Saturday': 'sábado',
  'Sunday': 'domingo',
};

const getTodaysExercises = (day, diasDisponiveis) => {
  let exercisePlan = {};
  switch(diasDisponiveis) {
    // Define exercise plan based on diasDisponiveis
    // ...
  }
  return exercisesByDay[exercisePlan[day]] || [];
};

const ExercisePage = () => {
  const [todaysExercises, setTodaysExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    const dayInEnglish = Object.keys(dayMap).find(key => dayMap[key] === todayFormatted);
    setSelectedDay(dayMap[todayFormatted]);
    setTodaysExercises(getTodaysExercises(dayInEnglish, diasDisponiveis));
  }, []);

  const handleDaySelect = (eventKey, event) => {
    const day = dayMap[eventKey];
    setSelectedDay(day);
    setTodaysExercises(getTodaysExercises(eventKey, diasDisponiveis));
  };

  return (
    <div className='m-3'>
      <DropdownButton id='day-select-dropdown' title={selectedDay || 'Selecionar Dia'} onSelect={handleDaySelect}>
        {Object.values(dayMap).map((dayName, index) => (
          <Dropdown.Item key={dayName} eventKey={Object.keys(dayMap)[index]}>{dayName}</Dropdown.Item>
        ))}
      </DropdownButton>
      <h2>Exercícios para hoje - {selectedDay || 'Hoje'}</h2>
      <ListGroup>
        {todaysExercises.length > 0 ? todaysExercises.map((exercicio, index) => (
          <ItemExercicio key={index} exercicio={exercicio} />
        )) : (
          <p>Nenhum exercício planejado para hoje.</p>
        )}
      </ListGroup>
    </div>
  );
};

export default ExercisePage;
