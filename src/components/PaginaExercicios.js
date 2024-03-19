import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import axios from 'axios';
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
  const [diasDisponiveis, setDiasDisponiveis] = useState(0);
  const [exerciciosHoje, setExerciciosHoje] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState('');

  useEffect(() => {
    const fetchDiasDisponiveis = async () => {
      try {
        const { data } = await axios.get('/api/obterDiasDisponiveis.php');
    console.log('Data from obterDiasDisponiveis:', data);
        if (data.sucesso) {
          setDiasDisponiveis(data.dias_disponiveis);
          const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
          setDiaSelecionado(dayMap[todayFormatted]);
          setExerciciosHoje(getTodaysExercises(dayMap[todayFormatted], data.dias_disponiveis));
        }
      } catch (error) {
        console.error('Erro ao obter os dias disponíveis: ', error);
      }
    };

    fetchDiasDisponiveis();
  }, []);

  useEffect(() => {
    if (diaSelecionado) {
      setExerciciosHoje(getTodaysExercises(diaSelecionado, diasDisponiveis));
    }
  }, [diaSelecionado, diasDisponiveis]);

  const handleDaySelect = (eventKey) => {
    const selectedDay = dayMap[eventKey];
    setDiaSelecionado(selectedDay);
    // Debug: Verifique se o dia selecionado está sendo definido corretamente
    console.log('Dia selecionado:', selectedDay);
    setExerciciosHoje(getTodaysExercises(selectedDay, diasDisponiveis));
    // Debug: Verifique se os exercícios de hoje estão sendo definidos corretamente
    console.log('Exercícios para hoje:', getTodaysExercises(selectedDay, diasDisponiveis));
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