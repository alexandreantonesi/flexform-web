//PaginaAnatomia.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import anteriorBraco from '../assets/muscles/anterior_braco.png';
import anteriorBracoColorido from '../assets/muscles/anterior_braco_colorido.png';
import anteriorTorso from '../assets/muscles/anterior_torso.png';
import anteriorTorsoColorido from '../assets/muscles/anterior_torso_colorido.png';
import posteriorTorso from '../assets/muscles/posterior_torso.png';
import pernas from '../assets/muscles/anterior_pernas.png';
import pernasColorido from '../assets/muscles/anterior_pernas_colorido.png';

const PaginaAnatomia = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [musculoSelecionado, setMusculoSelecionado] = useState(null);
  let navigate = useNavigate();

  const navegarParaDetalhe = (categoria) => {
    if (categoria === 'Membro superior') {
      setCategoriaSelecionada('braco');
    } else if (categoria === 'Parte anterior do torso') {
      setCategoriaSelecionada('torso-anterior');
    } else if (categoria === 'Parte posterior do torso') {
      setCategoriaSelecionada('torso-posterior');
    } else if (categoria === 'Pernas') {
      setCategoriaSelecionada('pernas');
    } else {
      navigate(`/anatomia/${categoria.toLowerCase().replace(/ /g, '-')}`);
    }
  };

  const handleMuscleClick = (muscle) => {
    setMusculoSelecionado(muscle);
  };

  const renderMuscleInfo = () => {
    if (musculoSelecionado) {
      let muscleFunction = '';

      switch (musculoSelecionado) {
        case 'Deltóide Anterior':
          muscleFunction = 'O deltóide anterior é responsável por elevar o braço para frente e para cima.';
          break;
        case 'Deltóide Medial':
          muscleFunction = 'O deltóide medial é responsável por elevar o braço para o lado.';
          break;
        case 'Tríceps':
          muscleFunction = 'O tríceps é responsável pela extensão do cotovelo.';
          break;
        case 'Bíceps':
          muscleFunction = 'O bíceps é responsável pela flexão do cotovelo e supinação do antebraço.';
          break;
        case 'Peitoral':
          muscleFunction = 'Os músculos peitorais são responsáveis pelos movimentos dos braços para a frente e adução do ombro.';
          break;
        case 'Abdominais':
          muscleFunction = 'Os músculos abdominais são responsáveis pela flexão da coluna vertebral e pela compressão do abdômen.';
          break;
        case 'Quadríceps':
          muscleFunction = 'Os quadríceps são responsáveis pela extensão do joelho.';
          break;
        case 'Gémeos':
          muscleFunction = 'Os músculos gémeos são responsáveis pela flexão plantar, elevando o calcanhar.';
          break;
        case 'Dorsal':
          muscleFunction = 'O músculo dorsal é responsável pelos movimentos dos braços para trás e rotação externa do ombro.';
          break;
        case 'Lombar':
          muscleFunction = 'Os músculos lombares são responsáveis pela estabilização da coluna vertebral e extensão do tronco.';
          break;
        default:
          muscleFunction = '';
      }

      return (
        <div>
          <h3>{musculoSelecionado}</h3>
          <p>{muscleFunction}</p>
        </div>
      );
    }
  };

  const renderDetalhesBraco = () => {
    if (categoriaSelecionada === 'braco') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
          <div style={{ marginRight: '20px' }}>
            <img src={anteriorBracoColorido} alt="Membro superior" style={{ width: '60%' }} />
          </div>
          <div>
            <ul style={{ textAlign: 'left' }}>
              <li style={{ color: '#91ec80', cursor: 'pointer' }} onClick={() => handleMuscleClick('Deltóide Anterior')}>Deltóide Anterior</li>
              <li style={{ color: '#7da2e2', cursor: 'pointer' }} onClick={() => handleMuscleClick('Deltóide Medial')}>Deltóide Medial</li>
              <li style={{ color: '#94f981', cursor: 'pointer' }} onClick={() => handleMuscleClick('Tríceps')}>Tríceps</li>
              <li style={{ color: '#f6df81', cursor: 'pointer' }} onClick={() => handleMuscleClick('Bíceps')}>Bíceps</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  const renderDetalhesTorsoAnterior = () => {
    if (categoriaSelecionada === 'torso-anterior') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
          <div style={{ marginRight: '20px' }}>
            <img src={anteriorTorsoColorido} alt="Parte anterior do torso" style={{ width: '60%' }} />
          </div>
          <div>
            <ul style={{ textAlign: 'left' }}>
              <li style={{ color: '#91ec80', cursor: 'pointer' }} onClick={() => handleMuscleClick('Peitoral')}>Peitoral</li>
              <li style={{ color: '#7da2e2', cursor: 'pointer' }} onClick={() => handleMuscleClick('Abdominais')}>Abdominais</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  const renderDetalhesPernas = () => {
    if (categoriaSelecionada === 'pernas') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px' }}>
          <div style={{ marginRight: '20px' }}>
            <img src={pernasColorido} alt="Pernas" style={{ width: '60%' }} />
          </div>
          <div>
            <ul style={{ textAlign: 'left' }}>
            <li style={{ color: '#91ec80', cursor: 'pointer' }} onClick={() => handleMuscleClick('Quadríceps')}>Quadríceps</li>
              <li style={{ color: '#7da2e2', cursor: 'pointer' }} onClick={() => handleMuscleClick('Gémeos')}>Gémeos</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  const categorias = [
    { nome: 'Membro superior', imagem: anteriorBraco },
    { nome: 'Parte anterior do torso', imagem: anteriorTorso },
    { nome: 'Parte posterior do torso', imagem: posteriorTorso },
    { nome: 'Pernas', imagem: pernas }
  ];

  const renderCategorias = () => {
    if (!categoriaSelecionada) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
          {categorias.map((categoria, index) => (
            <div key={index} onClick={() => navegarParaDetalhe(categoria.nome)}>
              <img src={categoria.imagem} alt={categoria.nome} style={{ cursor: 'pointer', width: '60%' }} />
              <p>{categoria.nome}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '1.2em' }}>
      <h2 style={{ fontSize: '1.5em' }}>Informações de Anatomia</h2>
      {renderMuscleInfo()}
      {renderDetalhesBraco()}
      {renderDetalhesTorsoAnterior()}
      {renderDetalhesPernas()}
      {renderCategorias()}
    </div>
  );
};

export default PaginaAnatomia;
