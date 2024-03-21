// PaginaExercicios.js
import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ItemExercicio from './ItemExercicio';

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

const PaginaExercicios = () => {
  const [exerciciosHoje, setExerciciosHoje] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState('');

  useEffect(() => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: ptBR });
    const mappedToday = dayMap[todayFormatted] || todayFormatted;
    setDiaSelecionado(mappedToday);
    setExerciciosHoje(getTodaysExercises(mappedToday));
  }, []);

  const handleDaySelect = (eventKey) => {
    const selectedDay = dayMap[eventKey];
    setDiaSelecionado(selectedDay);
    setExerciciosHoje(getTodaysExercises(selectedDay));
  };

  function getTodaysExercises(day) {
    const schedule = {
      'segunda-feira': 'push',
      'quarta-feira': 'legs',
      'sexta-feira': 'pull',
    };

    const workoutType = schedule[day];
    return workoutType ? exercisesByDay[workoutType] : [];
  }

  return (
    <div className="exercise-page">
      <DropdownButton
        id="day-select-dropdown"
        title={diaSelecionado || 'Selecionar Dia'}
        onSelect={handleDaySelect}
      >
        {Object.keys(dayMap).map((day) => (
          <Dropdown.Item key={day} eventKey={day}>{dayMap[day]}</Dropdown.Item>
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
