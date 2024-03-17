import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ExerciseItem from './ItemExercicio';
import stopIcon from '../assets/icons/stop.png';
import nutritionIcon from '../assets/icons/nutrition.png';
import sleepIcon from '../assets/icons/sleep.png';
import avoidIcon from '../assets/icons/avoid.png';

// Assume-se que diasDisponiveis é obtido de algum lugar, por exemplo, do perfil do usuário
const diasDisponiveis = 5; // Exemplo, este valor deverá ser dinâmico

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
  // Logic to determine the exercises based on available days
  let exercisePlan = {};

  switch(diasDisponiveis) {
    case 5:
      exercisePlan = {
        'Monday': 'push',
        'Tuesday': 'pull',
        'Wednesday': 'rest',
        'Thursday': 'legs',
        'Friday': 'push',
        'Saturday': 'pull',
        'Sunday': 'rest',
      };
      break;
    case 4:
      exercisePlan = {
        'Monday': 'push',
        'Tuesday': 'pull',
        'Wednesday': 'rest',
        'Thursday': 'push',
        'Friday': 'pull',
        'Saturday': 'rest',
        'Sunday': 'rest',
      };
      break;
    case 3:
      exercisePlan = {
        'Monday': 'push',
        'Tuesday': 'pull',
        'Wednesday': 'rest',
        'Thursday': 'legs',
        'Friday': 'rest',
        'Saturday': 'rest',
        'Sunday': 'rest',
      };
      break;
    case 2:
      exercisePlan = {
        'Monday': 'push',
        'Tuesday': 'rest',
        'Wednesday': 'rest',
        'Thursday': 'pull',
        'Friday': 'rest',
        'Saturday': 'rest',
        'Sunday': 'rest',
      };
      break;
    default:
      // Default to 5 days if an unsupported number of days is provided
      exercisePlan = {
        'Monday': 'push',
        'Tuesday': 'pull',
        'Wednesday': 'rest',
        'Thursday': 'legs',
        'Friday': 'push',
        'Saturday': 'pull',
        'Sunday': 'rest',
      };
      break;
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
    setSelectedDay(dayMap[eventKey]);
    setTodaysExercises(getTodaysExercises(eventKey, diasDisponiveis));
  };

  const handleAutoSelect = () => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    const dayInEnglish = Object.keys(dayMap).find(key => dayMap[key] === todayFormatted);
    setSelectedDay(dayMap[todayFormatted]);
    setTodaysExercises(getTodaysExercises(dayInEnglish, diasDisponiveis));
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayNames = daysOfWeek.map(day => dayMap[day]);

  return (
    <div className='m-3'>
      <DropdownButton id='day-select-dropdown' title={selectedDay ? selectedDay : 'Selecionar Dia'} onSelect={handleDaySelect}>
        {dayNames.map((dayName, index) => (
          <Dropdown.Item key={daysOfWeek[index]} eventKey={daysOfWeek[index]}>
            {dayName}
          </Dropdown.Item>
        ))}
        <Dropdown.Item eventKey='' onSelect={handleAutoSelect}>
          Detecção Automática
        </Dropdown.Item>
      </DropdownButton>
      <h2>Exercícios para hoje - {selectedDay ? selectedDay : 'Hoje'}</h2>
      <ListGroup>
        {todaysExercises.length > 0 ? (
          todaysExercises.map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} />
          ))
        ) : (
          <p>Nenhum exercício planejado para hoje.</p>
        )}
      </ListGroup>
    </div>
  );  
};

export default ExercisePage;
