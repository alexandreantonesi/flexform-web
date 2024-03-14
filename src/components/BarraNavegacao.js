// BarraNavegacao.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const BarraNavegacao = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/exercicios">Exercício</Nav.Link>
        <Nav.Link as={Link} to="/anatomia">Anatomia</Nav.Link>
        <Nav.Link as={Link} to="/progresso">Progresso</Nav.Link>
        <Nav.Link as={Link} to="/desafios">Desafios</Nav.Link>
        <Nav.Link as={Link} to="/conta">Conta e Conquistas</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default BarraNavegacao;
