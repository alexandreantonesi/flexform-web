// PaginaLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; // Verifique se o caminho está correto.

const PaginaLogin = () => {
  const navigate = useNavigate();
  const [credenciais, setCredenciais] = useState({
    nome: '',
    senha: ''
  });

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
        // Se o login for bem sucedido, redirecione para a página de exercícios
        navigate('/exercicios');
      } else {
        // Se o login falhar, exiba uma mensagem de erro
        alert(response.data.mensagem || 'Login falhou.');
      }
    } catch (error) {
      // Trate erros na requisição, como problemas de rede
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
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
