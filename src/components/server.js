const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flexform'
});

conexao.connect(error => {
  if (error) throw error;
  console.log("Conectado à base de dados FlexForm");
});

app.post('/api/register', async (req, res) => {
  const { nomeUtilizador, senha, diasDisponiveis, horasDisponiveis } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);

  conexao.query('INSERT INTO users (username, password, dias_treino, horas_treino) VALUES (?, ?, ?, ?)', 
  [nomeUtilizador, hashedPassword, diasDisponiveis, horasDisponiveis], (error, results) => {
    if (error) {
      return res.status(500).send('Erro ao registrar o usuário');
    }
    res.status(201).send('Usuário registrado com sucesso');
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
