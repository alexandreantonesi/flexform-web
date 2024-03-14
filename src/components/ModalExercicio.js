// ModalExercicio.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ModalExercicio = ({ mostrar, fechar, exercicio, idUsuario }) => {
  const [sets, setSets] = useState([]);
  const [mostrarTutorial, setMostrarTutorial] = useState(false);

  const introducaoExercicio = "Aqui vai uma breve introdução sobre o exercício, como executá-lo corretamente, e os benefícios.";
  const informacoesAnatomia = "Informações anatômicas específicas relacionadas ao exercício serão exibidas aqui.";
  
  const adicionarSet = () => {
    setSets([...sets, { reps: 0, weight: 0 }]);
  };

  const handleSetChange = (index, campo, valor) => {
    const setsAtualizados = [...sets];
    setsAtualizados[index][campo] = Number(valor);
    setSets(setsAtualizados);
  };

  const salvarTreino = async () => {
    // ... Existing save workout functionality ...
  };

  const handleStartExerciseClick = () => {
    setMostrarTutorial(true);
  };

  const startExercise = () => {
    console.log('Exercise started!');
    // Here you would add the code to interact with the Arduino or start the exercise logic
  };

  const renderExerciseTutorial = () => {
    // The content of your tutorial will go here. Replace placeholder text with actual instructions.
    return (
      <>
        <h5>Instruções do Exercício</h5>
        <p>{introducaoExercicio}</p>
        <h5>Anatomia Relacionada</h5>
        <p>{informacoesAnatomia}</p>
        <Button variant="primary" onClick={startExercise}>Iniciar Exercício</Button>
      </>
    );
  };

  return (
    <Modal show={mostrar} onHide={fechar}>
      <Modal.Header closeButton>
        <Modal.Title>{exercicio.nome}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {mostrarTutorial ? renderExerciseTutorial() : (
          <>
            <Button variant="primary" onClick={handleStartExerciseClick}>Começar Exercício</Button>
            {/* Render form to add sets here */}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={fechar}>Fechar</Button>
        <Button variant="primary" onClick={salvarTreino}>Salvar Treino</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalExercicio;
