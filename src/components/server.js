const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'flexform'
});

// Connect to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log("Entrámos na base de dados baby");
});

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint to create a workout entry
app.post('/api/workouts', (req, res) => {
  const data = req.body;
  const query = 'INSERT INTO treinos SET ?';
  connection.query(query, data, (error, results) => {
    if (error) throw error;
    res.status(201).send(`Adicionado workout com id ${results.insertId}`);
  });
});

// Endpoint to get workouts by user ID
app.get('/api/workouts/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  connection.query('SELECT * FROM treinos WHERE id_usuario = ?', [id_usuario], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
});

// Set your port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`A rodar na porta ${PORT}.`);
});
