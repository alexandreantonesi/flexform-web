<?php
// PaginaRegistro.php
$host = "localhost";
$user = "root";
$password = "";
$database = "flexform";
$nomeUtilizador = $_POST['nomeUtilizador'];
$senha = $_POST['senha']; // Remember to hash this password before storing it
$diasDisponiveis = $_POST['diasDisponiveis'];
$horasDisponiveis = $_POST['horasDisponiveis'];

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Hash the password - always do this server-side!
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$sql = "INSERT INTO utilizadores (nome_utilizador, senha_hash, dias_treino, horas_treino) VALUES (?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssii", $nomeUtilizador, $senhaHash, $diasDisponiveis, $horasDisponiveis);

if ($stmt->execute()) {
  echo "New record created successfully";
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
