// PaginaConta.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaConta = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('sessaoAtiva');
    localStorage.removeItem('tokenDeSessao');
    
    navigate('/login');
  };

  return (
    <div className="pagina-conta">
      <h1>Conta do Utilizador</h1>
      <button onClick={handleLogout}>Desconectar</button>
    </div>
  );
};

export default PaginaConta;
