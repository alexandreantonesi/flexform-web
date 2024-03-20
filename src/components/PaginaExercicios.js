import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import ItemExercicio from './ItemExercicio';

const dayMap = {
  'Monday': 'segunda-feira',
  'Tuesday': 'terça-feira',
  'Wednesday': 'quarta-feira',
  'Thursday': 'quinta-feira',
  'Friday': 'sexta-feira',
  'Saturday': 'sábado',
  'Sunday': 'domingo',
};

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

function getTodaysExercises(day) {
  const schedule = {
    'segunda-feira': 'push',
    'terça-feira': 'pull',
    'quarta-feira': 'legs',
    'quinta-feira': 'push',
    'sexta-feira': 'pull',
    'sábado': 'rest',
    'domingo': 'rest',
  };

  const workoutType = schedule[day.toLowerCase()];
  return workoutType ? exercisesByDay[workoutType] : [];
}

const PaginaExercicios = () => {
  const navigate = useNavigate();
  const [exerciciosHoje, setExerciciosHoje] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState('');

  useEffect(() => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    const mappedToday = dayMap[todayFormatted] || todayFormatted;
    setDiaSelecionado(mappedToday);
    setExerciciosHoje(getTodaysExercises(mappedToday));
  }, []);

  const handleDaySelect = (eventKey) => {
    const selectedDay = dayMap[eventKey];
    setDiaSelecionado(selectedDay);
    setExerciciosHoje(getTodaysExercises(selectedDay));
  };

  const navigateToExerciseStart = (exercise) => {
    navigate('/inicio-exercicio', { state: { exercise } });
  };

  return (
    <div className="exercise-page">
      <DropdownButton
        id="day-select-dropdown"
        title={diaSelecionado || 'Selecionar Dia'}
        onSelect={handleDaySelect}
      >
        {Object.keys(dayMap).map(day => (
          <Dropdown.Item key={day} eventKey={day}>{dayMap[day]}</Dropdown.Item>
        ))}
      </DropdownButton>
      <h2>Exercícios para hoje - {diaSelecionado}</h2>
      <ListGroup>
        {exerciciosHoje.length > 0 ? (
          exerciciosHoje.map((exercise, index) => (
            <ItemExercicio key={index} exercise={exercise} navigateToExerciseStart={navigateToExerciseStart} />
          ))
        ) : (
          <p>Nenhum exercício planejado para hoje.</p>
        )}
      </ListGroup>
    </div>
  );
};

export default PaginaExercicios;
