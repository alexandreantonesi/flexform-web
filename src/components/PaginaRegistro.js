// PaginaRegistro.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Registro.css'; // Make sure the path to your CSS file is correct

const PaginaRegistro = () => {
  const [etapaAtual, setEtapaAtual] = useState(1);
  const [dadosRegistro, setDadosRegistro] = useState({
    nomeUtilizador: '',
    senha: '',
    diasDisponiveis: '',
    horasDisponiveis: ''
  });

  const atualizarDadosRegistro = (campo, valor) => {
    setDadosRegistro({ ...dadosRegistro, [campo]: valor });
  };

  const finalizarRegistro = async () => {
    const endpoint = 'http://localhost//PaginaRegistro.php'; // Update with your actual PHP file path

    try {
      const formData = new FormData();
      formData.append('nomeUtilizador', dadosRegistro.nomeUtilizador);
      formData.append('senha', dadosRegistro.senha);
      formData.append('diasDisponiveis', dadosRegistro.diasDisponiveis);
      formData.append('horasDisponiveis', dadosRegistro.horasDisponiveis);

      const response = await axios.post(endpoint, formData);

      // Processa a resposta aqui. Por exemplo, lidar com redirecionamento ou mostrar uma mensagem de sucesso.
      console.log(response.data);
      // Add any post-registration logic here, such as redirecting to a different page
    } catch (error) {
      // Trata erros aqui. Por exemplo, mostrar uma mensagem de erro.
      console.error(error);
      // Display a user-friendly error message
    }
  };

  return (
    <div className="container-registro">
      <div className="card-registro">
        {etapaAtual === 1 && (
          <>
            <label htmlFor="nomeUtilizador">Nome de Utilizador:</label>
            <input
              type="text"
              id="nomeUtilizador"
              value={dadosRegistro.nomeUtilizador}
              onChange={(e) => atualizarDadosRegistro('nomeUtilizador', e.target.value)}
            />
            <button onClick={() => setEtapaAtual(2)}>Próximo</button>
          </>
        )}
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
        {etapaAtual === 3 && (
          <>
            <div className="form-group">
              <label htmlFor="diasDisponiveis">Número de dias disponíveis semanalmente:</label>
              <select
                id="diasDisponiveis"
                value={dadosRegistro.diasDisponiveis}
                onChange={(e) => atualizarDadosRegistro('diasDisponiveis', e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="2">2 dias</option>
                <option value="3">3 dias</option>
                <option value="4">4 dias</option>
                <option value="5">5 dias</option>
              </select>
            </div>
            <div className="form-group">
            <label htmlFor="horasDisponiveis">Número de horas disponíveis semanalmente:</label>
              <select
                id="horasDisponiveis"
                value={dadosRegistro.horasDisponiveis}
                onChange={(e) => atualizarDadosRegistro('horasDisponiveis', e.target.value)}
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
