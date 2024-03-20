// RotasProtegidas.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PaginaExercicios from './PaginaExercicios';
import PaginaInicioExercicio from './PaginaInicioExercicio';
import PaginaDeAnatomia from './PaginaAnatomia';
import PaginaConta from './PaginaConta';
import PaginaLogin from './PaginaLogin';

const checkAuth = () => {
  const sessaoAtiva = localStorage.getItem('sessaoAtiva');
  console.log('sessao ativa:', sessaoAtiva);
  return sessaoAtiva;
};

const ProtectedRoute = ({ children }) => {
  if (!checkAuth()) {
    return <Navigate to="/login" />;
  }
  return children;
};

const RotasProtegidas = () => {
  return (
    <Routes>
      <Route path="/exercicios" element={<ProtectedRoute><PaginaExercicios /></ProtectedRoute>} />
      <Route path="/inicio-exercicio" element={<ProtectedRoute><PaginaInicioExercicio /></ProtectedRoute>} />
      <Route path="/anatomia" element={<ProtectedRoute><PaginaDeAnatomia /></ProtectedRoute>} />
      <Route path="/conta" element={<ProtectedRoute><PaginaConta /></ProtectedRoute>} />
      {}
    </Routes>
  );
};

export default RotasProtegidas;
