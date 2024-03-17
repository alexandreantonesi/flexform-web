// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarraDeNavegacao from './components/BarraNavegacao';
import RotasProtegidas from './components/RotasProtegidas';
import PaginaLogin from './components/PaginaLogin';
import PaginaRegistro from './components/PaginaRegistro';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <BarraDeNavegacao />
        <Routes>
          {/* Rotas protegidas são incluídas via componente RotasProtegidas */}
          <Route path="/" element={<RotasProtegidas />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/registrar" element={<PaginaRegistro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
