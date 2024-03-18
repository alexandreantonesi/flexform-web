// ItemExercicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'react-bootstrap';

const ItemExercicio = ({ exercicio }) => {
  let navegar = useNavigate();
  
  const iniciarExercicio = () => {
    navegar('/inicio-exercicio', { state: { exercicio } });
  };

  console.log('Received exercise:', exercicio);

  if (!exercicio || !exercicio.nome || !exercicio.musculos) {
    console.error('Exercise data is missing or incomplete:', exercicio);
    return <p>Dados do exercício não estão disponíveis.</p>;
  }

  return (
    <ListGroupItem>
      <div className="item-exercicio">
        <div className="info-exercicio">
          <h4>{exercicio.nome}</h4>
          <p>{exercicio.musculos}</p>
        </div>
        <Button variant="primary" onClick={iniciarExercicio}>
          Iniciar
        </Button>
      </div>
    </ListGroupItem>
  );
};

export default ItemExercicio;
