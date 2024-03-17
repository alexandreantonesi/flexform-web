import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarraDeNavegação from './components/BarraNavegacao.js';
import comAutenticacao from './components/comAutenticacao'; // Adicione o import para o HOC
import PaginaDeExercicios from './components/PaginaExercicios.js';
import PaginaInicioExercicio from './components/PaginaInicioExercicio';
import PaginaDeAnatomia from './components/PaginaAnatomia';
import PaginaConta from './components/PaginaConta.js';
import PaginaLogin from './components/PaginaLogin.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginaRegistro from './components/PaginaRegistro.js';

function App() {
  return (
    <Router>
      <div className="App">
        <BarraDeNavegação />
        <Routes>
          <Route path="/" element={comAutenticacao(PaginaDeExercicios)} />
          <Route path="/exercicios" element={comAutenticacao(PaginaDeExercicios)} />
          <Route path="/anatomia" element={comAutenticacao(PaginaDeAnatomia)} />
          <Route path="/iniciar-exercicio" element={comAutenticacao(PaginaInicioExercicio)} />
          <Route path="/conta" element={comAutenticacao(PaginaConta)} />
          <Route path="/registrar" element={<PaginaRegistro />} />
          <Route path="/login" element={<PaginaLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
