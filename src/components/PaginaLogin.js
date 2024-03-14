// PaginaLogin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Atualize este caminho se necessário.

const PaginaLogin = () => {
  const navigate = useNavigate();

  const irParaLogin = () => {
    navigate('/login'); // substitua isso pelo caminho da sua página de login, se for diferente
  };

  const irParaRegistrar = () => {
    navigate('/registrar'); // substitua isso pelo caminho da sua página de registro
  };

  return (
    <div className="login-container">
      <div className="botoes-autenticacao">
        <button onClick={irParaLogin}>Entrar</button>
        <button onClick={irParaRegistrar}>Registrar</button>
      </div>
    </div>
  );
};

export default PaginaLogin;
