import React, { useState, useEffect } from 'react';
import { ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import ItemExercicio from './ItemExercicio';
import axios from 'axios';

const PaginaExercicios = () => {
  const [diasDisponiveis, setDiasDisponiveis] = useState(0);
  const [exerciciosHoje, setExerciciosHoje] = useState([]);
  const [diaSelecionado, setDiaSelecionado] = useState('');

  useEffect(() => {
    const fetchDiasDisponiveis = async () => {
      try {
        const { data } = await axios.get('/caminho/para/servidor/api/diasDisponiveis');
        setDiasDisponiveis(data.dias_disponiveis);
        const today = format(new Date(), 'EEEE', { locale: pt });
        setDiaSelecionado(today);
        setExerciciosHoje(getTodaysExercises(today, data.dias_disponiveis));
      } catch (error) {
        console.error('Erro ao obter os dias disponíveis: ', error);
      }
    };

    fetchDiasDisponiveis();
  }, []);

  useEffect(() => {
    const todayFormatted = format(new Date(), 'EEEE', { locale: pt });
    setExerciciosHoje(getTodaysExercises(todayFormatted, diasDisponiveis));
  }, [diasDisponiveis, diaSelecionado]);

  const handleDaySelect = (eventKey) => {
    const selectedDayPortuguese = dayMap[eventKey];
    setDiaSelecionado(selectedDayPortuguese);
    setExerciciosHoje(getTodaysExercises(eventKey, diasDisponiveis));
  };

  const exercisesByDay = {
    push: [
      { nome: 'Supino com Halteres', musculos: 'Cabeça esternocostal do peitoral maior, tríceps, deltoides anteriores' },
      { nome: 'Peck Deck', musculos: 'Cabeça esternocostal do peitoral maior, tríceps, deltoides anteriores' },
      { nome: 'Elevação Frontal com Cabo', musculos: 'Cabeça clavicular do peitoral maior, deltoides anteriores' },
      { nome: 'Supino Inclinado com Halteres', musculos: 'Cabeça clavicular do peitoral maior, tríceps, deltoides anteriores' }
    ],
    pull: [
      { nome: 'Rosca com Cabo', musculos: 'Bíceps, braquial' },
      { nome: 'Rosca Direta', musculos: 'Bíceps, braquial' },
      { nome: 'Rosca Scott', musculos: 'Cabeça curta do bíceps, braquial' },
      { nome: 'Rosca Inclinada', musculos: 'Cabeça longa do bíceps, braquial' },
      { nome: 'Remada em T', musculos: 'Músculos das costas' },
      { nome: 'Pulldown', musculos: 'Músculos das costas' },
      { nome: 'Remada Sentada', musculos: 'Músculos das costas' },
      { nome: 'Voador Inverso', musculos: 'Deltoides posteriores' }
    ],
    legs: [
      { nome: 'Agachamento', musculos: 'Músculos das pernas' },
      { nome: 'Prensa de Pernas', musculos: 'Músculos das pernas' },
      { nome: 'Extensão de Pernas', musculos: 'Músculos das pernas' },
      { nome: 'Flexão de Pernas', musculos: 'Músculos das pernas' }
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

  const getTodaysExercises = (day, availableDays) => {
    const dayInEnglish = Object.keys(dayMap).find(key => dayMap[key] === day);
    let exercisePlan = {};
    if (availableDays === 5) {
      exercisePlan = {
        'Monday': 'push', 'Tuesday': 'pull', 'Wednesday': 'rest', 'Thursday': 'legs',
        'Friday': 'push', 'Saturday': 'pull', 'Sunday': 'rest'
      };
    } else if (availableDays === 4) {
      exercisePlan = {
        'Monday': 'push', 'Tuesday': 'pull', 'Wednesday': 'rest', 'Thursday': 'push',
        'Friday': 'pull', 'Saturday': 'rest', 'Sunday': 'rest'
      };
    } else if (availableDays === 3) {
      exercisePlan = {
        'Monday': 'push', 'Tuesday': 'pull', 'Wednesday': 'rest', 'Thursday': 'legs',
        'Friday': 'rest', 'Saturday': 'rest', 'Sunday': 'rest'
      };
    } else if (availableDays === 2) {
      exercisePlan = {
        'Monday': 'push', 'Tuesday': 'rest', 'Wednesday': 'rest', 'Thursday': 'pull',
        'Friday': 'rest', 'Saturday': 'rest', 'Sunday': 'rest'
      };
    } else {
      return [];
    }
    return exercisesByDay[exercisePlan[dayInEnglish]] || [];
  };

  return (
    <div className='m-3'>
      <DropdownButton id='day-select-dropdown' title={diaSelecionado || 'Selecionar Dia'} onSelect={handleDaySelect}>
        {Object.keys(dayMap).map((dayKey) => (
          <Dropdown.Item key={dayKey} eventKey={dayKey}>{dayMap[dayKey]}</Dropdown.Item>
        ))}
      </DropdownButton>
      <h2>Exercícios para hoje - {diaSelecionado || 'Hoje'}</h2>
      <ListGroup>
        {exerciciosHoje.length > 0 ? exerciciosHoje.map((exercicio, index) => (
          <ItemExercicio key={index} exercicio={exercicio} />
        )) : <p>Nenhum exercício planejado para hoje.</p>}
      </ListGroup>
    </div>
  );
};

export default PaginaExercicios;
