<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require './basedados.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Método de pedido inválido']);
    exit;
}

$entrada = json_decode(file_get_contents('php://input'), true);

if (!isset($entrada['nome'], $entrada['senha'], $entrada['dias_disponiveis'], $entrada['horas_disponiveis'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados em falta']);
    exit;
}

$nome = filter_var($entrada['nome'], FILTER_SANITIZE_STRING);
$senha = $entrada['senha'];
$diasDisponiveis = filter_var($entrada['dias_disponiveis'], FILTER_SANITIZE_NUMBER_INT);
$horasDisponiveis = filter_var($entrada['horas_disponiveis'], FILTER_SANITIZE_NUMBER_INT);

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$stmt = $conn->prepare('INSERT INTO utilizadores (nome, senha, dias_disponiveis, horas_disponiveis) VALUES (?, ?, ?, ?)');
$stmt->bind_param('ssii', $nome, $senhaHash, $diasDisponiveis, $horasDisponiveis);

if ($stmt->execute()) {
    echo json_encode(['sucesso' => true, 'mensagem' => 'Registrado com sucesso']);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao registrar']);
}

$stmt->close();
$conn->close();
?>
