// RotasProtegidas.js
import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PaginaDeExercicios from './PaginaExercicios';
import PaginaInicioExercicio from './PaginaInicioExercicio';
import PaginaDeAnatomia from './PaginaAnatomia';
import PaginaConta from './PaginaConta';

const RotasProtegidas = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessaoAtiva = localStorage.getItem('sessaoAtiva');
    if (!sessaoAtiva) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/exercicios" element={<PaginaDeExercicios />} />
      <Route path="/anatomia" element={<PaginaDeAnatomia />} />
      <Route path="/iniciar-exercicio" element={<PaginaInicioExercicio />} />
      <Route path="/conta" element={<PaginaConta />} />
      {/* Adicione mais rotas protegidas conforme necessário */}
    </Routes>
  );
};

export default RotasProtegidas;
