// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarraNavegacao from './components/BarraNavegacao';
import PaginaLogin from './components/PaginaLogin';
import PaginaRegistro from './components/PaginaRegistro';
import RotasProtegidas from './components/RotasProtegidas';
import PaginaInicioExercicio from './components/PaginaInicioExercicio'; // Import PaginaInicioExercicio component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <BarraNavegacao />
        <Routes>
          <Route path="/*" element={<RotasProtegidas />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/registrar" element={<PaginaRegistro />} />
          <Route path="/inicio-exercicio" element={<PaginaInicioExercicio />} /> {/* Add this route */}
          {}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
