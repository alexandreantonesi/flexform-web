import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TutorialModal = ({ show, onHide, exercise }) => {
  if (!exercise) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{`Tutorial para ${exercise.name}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {}
        <p>{`Aqui será apresentado o conteúdo do tutorial para o exercício ${exercise.name}.`}</p>
        {}
        {}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TutorialModal;
