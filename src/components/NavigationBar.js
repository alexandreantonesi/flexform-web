import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="light" variant="light" fixed="bottom">
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/exercicios">Exercício</Nav.Link>
        <Nav.Link as={Link} to="/anatomia">Anatomia</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
