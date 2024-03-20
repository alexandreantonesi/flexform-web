import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const PaginaLogin = () => {
  const navigate = useNavigate();
  const [credenciais, setCredenciais] = useState({
    nome: '',
    senha: ''
  });

  useEffect(() => {
    const sessaoAtiva = localStorage.getItem('sessaoAtiva');
    if (sessaoAtiva) {
      navigate('/exercicios');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciais(prevCredenciais => ({
      ...prevCredenciais,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/api/PaginaLogin.php', credenciais);
      if (response.data.sucesso) {
        localStorage.setItem('sessaoAtiva', 'true');
        localStorage.setItem('tokenDeSessao', response.data.tokenDeSessao);

        navigate('/exercicios');
      } else {
        alert(response.data.mensagem || 'Login falhou.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao fazer login... tenta novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <form className="form-login" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome de Utilizador:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={credenciais.nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={credenciais.senha}
            onChange={handleChange}
          />
        </div>
        <div className="botoes-autenticacao">
          <button type="submit">Entrar</button>
          <button type="button" onClick={() => navigate('/registrar')}>Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default PaginaLogin;
