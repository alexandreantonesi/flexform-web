// server.js
const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Criação da conexão com a base de dados
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flexform'
});

// Conectar ao MySQL
conexao.connect(erro => {
  if (erro) throw erro;
  console.log("Conectado à base de dados FlexForm");
});

// Endpoint para login
app.post('/api/login', (req, res) => {
  const { nomeUtilizador, senha } = req.body;
  conexao.query('SELECT * FROM utilizadores WHERE nome_utilizador = ?', [nomeUtilizador], async (erro, resultados) => {
    if (erro) {
      res.status(500).send('Ocorreu um erro no servidor');
    } else if (resultados.length > 0) {
      const utilizador = resultados[0];
      const senhaCorreta = await bcrypt.compare(senha, utilizador.senha_hash);
      if (senhaCorreta) {
        res.status(200).send('Login efetuado com sucesso.');
      } else {
        res.status(401).send('Credenciais incorretas.');
      }
    } else {
      res.status(404).send('Utilizador não encontrado.');
    }
  });
});

// Definir a porta
const PORTA = process.env.PORT || 3001;
app.listen(PORTA, () => {
  console.log(`Servidor a correr na porta ${PORTA}.`);
});
