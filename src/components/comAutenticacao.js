// comAutenticacao.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const comAutenticacao = (Componente) => {
  return (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      const sessaoAtiva = localStorage.getItem('sessaoAtiva');
      if (!sessaoAtiva) {
        navigate('/login');
      }
    }, [navigate]);

    const sessaoAtiva = localStorage.getItem('sessaoAtiva');
    return sessaoAtiva ? <Componente {...props} /> : null;
  };
};

export default comAutenticacao;
