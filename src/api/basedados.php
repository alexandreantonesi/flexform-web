<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "flexform";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("falha na conexão: " . $conn->connect_error);
}
?>
