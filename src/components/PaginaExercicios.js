import React, { useState, useEffect } from 'react';
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

const getTodaysExercises = (day, availableDays) => {
  const dayIndex = new Date().getDay();
  const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = week[dayIndex];

  const scheduleKey = availableDays.toString();
  const schedule = {
    '2': ['monday', 'thursday'],
    '3': ['monday', 'wednesday', 'friday'],
    '4': ['monday', 'tuesday', 'thursday', 'friday'],
    '5': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  };

  const workoutTypeMap = {
    'monday': 'push',
    'tuesday': 'pull',
    'wednesday': 'legs',
    'thursday': 'push',
    'friday': 'pull',
  };

  const workoutDays = schedule[scheduleKey] || [];
  if (workoutDays.includes(today)) {
    const workoutType = workoutTypeMap[today];
    return exercisesByDay[workoutType] || [];
  } else {
    return exercisesByDay['rest'] || [];
  }
};

const PaginaExercicios = () => {
  const [diasDisponiveis] = useState(3); // Hardcoded value of 3 days per week
  const [exerciciosHoje, setExerciciosHoje] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState('');

  useEffect(() => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    const mappedToday = dayMap[todayFormatted] || todayFormatted;

    setDiaSelecionado(mappedToday);
    setExerciciosHoje(getTodaysExercises(mappedToday, 3)); // Use the hardcoded value of 3
  }, []);

  const handleDaySelect = (eventKey) => {
    const selectedDay = dayMap[eventKey];
    setDiaSelecionado(selectedDay);
    setExerciciosHoje(getTodaysExercises(selectedDay, 3)); // Use the hardcoded value of 3
  };

  return (
    <div className="exercise-page">
      <DropdownButton
        id="day-select-dropdown"
        title={diaSelecionado || 'Selecionar Dia'}
        onSelect={handleDaySelect}
      >
        {Object.keys(dayMap).map(day => (
          <Dropdown.Item key={day} eventKey={day}>
            {dayMap[day]}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <h2>Exercícios para hoje - {diaSelecionado}</h2>
      <ListGroup>
        {exerciciosHoje.length > 0 ? (
          exerciciosHoje.map((exercicio, index) => (
            <ItemExercicio key={index} exercicio={exercicio} />
          ))
        ) : (
          <p>Nenhum exercício planejado para hoje.</p>
        )}
      </ListGroup>
    </div>
  );
};

export default PaginaExercicios;
