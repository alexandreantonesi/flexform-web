// ItemExercicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'react-bootstrap';

const ItemExercicio = ({ exercicio }) => {
  let navegar = useNavigate();
  
  const iniciarExercicio = () => {
    navegar('/inicio-exercicio', { state: { exercicio } });
  };

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
