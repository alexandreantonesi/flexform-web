const mysql = require('mysql');

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
