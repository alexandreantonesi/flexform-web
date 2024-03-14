// PaginaLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const PaginaLogin = () => {
  const [nomeUtilizador, setNomeUtilizador] = useState('');
  const [senha, setSenha] = useState('');

  const efetuarLogin = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('/api/login', { nomeUtilizador, senha });
      console.log(resposta.data);
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={efetuarLogin}>
        <label htmlFor="username">Nome de Utilizador:</label>
        <input
          type="text"
          id="username"
          value={nomeUtilizador}
          onChange={(e) => setNomeUtilizador(e.target.value)}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default PaginaLogin;
