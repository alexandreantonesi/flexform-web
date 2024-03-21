//ItemExercicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'react-bootstrap';

const ItemExercicio = ({ exercicio }) => {
  let navigate = useNavigate();

  const iniciarExercicio = () => {
    navigate('/iniciar-exercicio');
  };  

  if (!exercicio || !exercicio.name || !exercicio.muscles) {
    console.error('Dados do exercício ausentes ou incompletos:', exercicio);
    return <p>Dados do exercício não estão disponíveis.</p>;
  }

  return (
    <ListGroupItem>
      <div className="item-exercicio">
        <div className="info-exercicio">
          <h4>{exercicio.name}</h4>
          <p>{exercicio.muscles}</p>
        </div>
        <Button variant="primary" onClick={iniciarExercicio}>
          Iniciar
        </Button>
      </div>
    </ListGroupItem>
  );
};

export default ItemExercicio;
