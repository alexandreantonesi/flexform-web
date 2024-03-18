// RotasProtegidas.js

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PaginaExercicios from './PaginaExercicios';
import PaginaInicioExercicio from './PaginaInicioExercicio';
import PaginaDeAnatomia from './PaginaAnatomia';
import PaginaConta from './PaginaConta';
import PaginaLogin from './PaginaLogin';

const checkAuth = () => {
  const sessaoAtiva = localStorage.getItem('sessaoAtiva'); // This is just an example
  console.log('Session active:', sessaoAtiva); // This will log true or false
  return sessaoAtiva;
};

const ProtectedRoute = ({ children }) => {
  if (!checkAuth()) {
    // User is not authenticated, redirect to the login page
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
      {/* Add more protected routes here */}
    </Routes>
  );
};

export default RotasProtegidas;
