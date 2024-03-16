// PaginaRegistro.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registro.css';

const PaginaRegistro = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dadosRegistro, setDadosRegistro] = useState({
    nome: '',
    senha: '',
    dias_disponiveis: '',
    horas_disponiveis: ''
  });

  const atualizarDadosRegistro = (campo, valor) => {
    setDadosRegistro({ ...dadosRegistro, [campo]: valor });
  };

  const finalizarRegistro = async () => {
    const endpoint = 'http://localhost/api/PaginaRegistro.php';
  
    try {
      const response = await axios.post(endpoint, {
        nome: dadosRegistro.nome,
        senha: dadosRegistro.senha,
        dias_disponiveis: dadosRegistro.dias_disponiveis,
        horas_disponiveis: dadosRegistro.horas_disponiveis
      });

      console.log(response.data);
      // Handle the response here, e.g., showing a success message or redirecting the user
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Handle the error here, e.g., showing an error message to the user
    }
  };

  return (
    <div className="container-registro">
      <div className="card-registro">
        {/* Step 1: User Name */}
        {etapaAtual === 1 && (
          <>
            <label htmlFor="nome">Nome de Utilizador:</label>
            <input
              type="text"
              id="nome"
              value={dadosRegistro.nome}
              onChange={(e) => atualizarDadosRegistro('nome', e.target.value)}
            />
            <button onClick={() => setEtapaAtual(2)}>Próximo</button>
          </>
        )}
        {/* Step 2: Password */}
        {etapaAtual === 2 && (
          <>
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={dadosRegistro.senha}
              onChange={(e) => atualizarDadosRegistro('senha', e.target.value)}
            />
            <button onClick={() => setEtapaAtual(1)}>Anterior</button>
            <button onClick={() => setEtapaAtual(3)}>Próximo</button>
          </>
        )}
        {/* Step 3: Availability */}
        {etapaAtual === 3 && (
          <>
            <div className="form-group">
              <label htmlFor="dias_disponiveis">Número de dias disponíveis semanalmente:</label>
              <select
                id="dias_disponiveis"
                value={dadosRegistro.dias_disponiveis}
                onChange={(e) => atualizarDadosRegistro('dias_disponiveis', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="2">2 dias</option>
                <option value="3">3 dias</option>
                <option value="4">4 dias</option>
                <option value="5">5 dias</option>
              </select>
            </div>
            <div className="form-group">
            <label htmlFor="horas_disponiveis">Número de horas disponíveis semanalmente:</label>
              <select
                id="horas_disponiveis"
                value={dadosRegistro.horas_disponiveis}
                onChange={(e) => atualizarDadosRegistro('horas_disponiveis', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="60">60 minutos</option>
                <option value="90">90 minutos</option>
                <option value="120">120 minutos</option>
              </select>
            </div>
            <div className="navigation-buttons">
              <button onClick={() => setEtapaAtual(2)}>Anterior</button>
              <button onClick={finalizarRegistro}>Finalizar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaginaRegistro;
