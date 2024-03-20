// ItemExercicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'react-bootstrap';

const ItemExercicio = ({ exercicio }) => {
  let navigate = useNavigate();

  const iniciarExercicio = () => {
    navigate('/inicio-exercicio', { state: { exercicio } });
  };

  console.log('recebido exercicio:', exercicio);

  if (!exercicio || !exercicio.name || !exercicio.muscles) {
    console.error('dados do exercicio nao recebidos:', exercicio);
    return <p>Não foi possível obter os dsados do exercício...</p>;
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
