import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import ExerciseItem from './ExerciseItem';
import stopIcon from '../assets/icons/stop.png';
import nutritionIcon from '../assets/icons/nutrition.png';
import sleepIcon from '../assets/icons/sleep.png';
import avoidIcon from '../assets/icons/avoid.png';

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

const getTodaysExercises = (day) => {
  const exercisePlan = {
    'Monday': 'push',
    'Tuesday': 'pull',
    'Wednesday': 'rest',
    'Thursday': 'legs',
    'Friday': 'push',
    'Saturday': 'pull',
    'Sunday': 'rest',
  };

  return exercisesByDay[exercisePlan[day]] || [];
};

const ExercisePage = () => {
  const [todaysExercises, setTodaysExercises] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    setSelectedDay(dayMap[todayFormatted.toLowerCase()]);
    setTodaysExercises(getTodaysExercises(dayMap[todayFormatted.toLowerCase()]));
  }, []);

  const handleDaySelect = (eventKey, event) => {
    setSelectedDay(eventKey);
    setTodaysExercises(getTodaysExercises(eventKey));
  };

  const handleAutoSelect = () => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    const englishDay = Object.keys(dayMap).find(key => dayMap[key] === todayFormatted.toLowerCase());
    setSelectedDay(englishDay);
    setTodaysExercises(getTodaysExercises(englishDay));
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayNames = daysOfWeek.map(day => dayMap[day]);

  return (
    <div className='m-3'>
      <DropdownButton id='day-select-dropdown' title={selectedDay ? dayMap[selectedDay] : 'Selecionar Dia'} onSelect={handleDaySelect}>
        {dayNames.map((dayName, index) => (
          <Dropdown.Item key={daysOfWeek[index]} eventKey={daysOfWeek[index]}>
            {dayName}
          </Dropdown.Item>
        ))}
        <Dropdown.Item eventKey='' onSelect={handleAutoSelect}>
          Detecção Automática
        </Dropdown.Item>
      </DropdownButton>
      <h2>Exercícios para hoje - {selectedDay ? dayMap[selectedDay] : 'Hoje'}</h2>
      <ListGroup>
        {todaysExercises.length > 0 ? (
          todaysExercises.map((exercise, index) => (
            <ExerciseItem key={index} exercise={exercise} />
          ))
        ) : selectedDay && (selectedDay === 'Wednesday' || selectedDay === 'Sunday') ? (
          <div className="rest-day-ui" style={{ textAlign: 'center' }}>
            <img src={stopIcon} alt="" style={{ maxWidth: '200px', margin: '0 auto' }} />
            <h1 style={{ marginTop: '20px' }}>Hoje é dia de descanso.</h1>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <h5 style={{ marginBottom: '10px' }}>
                <img src={nutritionIcon} alt="Nutrition" style={{ maxWidth: '50px', marginRight: '10px', marginTop: '50px' }} />
                Assegura-te de atingires uma nutrição adequada para fornecer ao teu corpo o que necessita para a tua recuperação, bem como a construção de novas fibras musculares
              </h5>
              <h5 style={{ marginBottom: '10px' }}>
                <img src={sleepIcon} alt="" style={{ maxWidth: '50px', marginRight: '10px', marginTop: '50px' }} />
                O sono é de extrema importância, é aqui que uma grande parte da construção e reparação de fibras musculares, aproveita-o como uma chave essencial para o teu crescimento (recomendado 7 - 9 horas de sono por noite)
              </h5>
              <h5 style={{ marginBottom: '10px' }}>
                <img src={avoidIcon} alt="" style={{ maxWidth: '50px', marginRight: '10px', marginTop: '50px', marginBlockEnd: '50px' }} />
                Evita esforço físico desnecessário
              </h5>
            </ul>
          </div>
        ) : (
          <p>Descanso ou dia não definido</p>
        )}
      </ListGroup>
    </div>
  );  
};

export default ExercisePage;
