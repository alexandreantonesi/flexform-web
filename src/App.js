import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarraDeNavegação from './components/BarraNavegacao.js';
import PaginaDeExercicios from './components/PaginaExercicios.js';
import PaginaInicioExercicio from './components/PaginaInicioExercicio';
import PaginaDeAnatomia from './components/PaginaAnatomia';
import PaginaLogin from './components/PaginaLogin.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginaRegistro from './components/PaginaRegistro.js';

function App() {
  return (
    <Router>
      <div className="App">
        <BarraDeNavegação />
        <Routes>
          <Route path="/" element={<PaginaDeExercicios />} />
          <Route path="/exercicios" element={<PaginaDeExercicios />} />
          <Route path="/anatomia" element={<PaginaDeAnatomia />} />
          <Route path="/iniciar-exercicio" element={<PaginaInicioExercicio />} />
          <Route path="/registrar" element={<PaginaRegistro />} />
          <Route path="/login" element={<PaginaLogin />} /> {/* Adiciona esta linha para a rota de login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
