// ItemExercicio.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroupItem } from 'react-bootstrap';

const ItemExercicio = ({ exercicio }) => {
  const navigate = useNavigate();

  const iniciarExercicio = () => {
    // Ensure that we have the necessary exercise data
    if (exercicio && exercicio.name && exercicio.muscles) {
      navigate('/inicio-exercicio', { state: { exercicio } });
    } else {
      console.error('Attempted to start exercise with invalid data:', exercicio);
    }
  };

  if (!exercicio || typeof exercicio !== 'object' || !exercicio.name || !exercicio.muscles) {
    console.error('Exercise data is missing or incomplete:', exercicio);
    return <p>Não foi possível obter os dados do exercício. Verifique se os dados estão corretos.</p>;
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
