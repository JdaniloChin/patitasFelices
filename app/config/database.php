<?php
require_once __DIR__ . "/env.php";
cargarEnv(__DIR__ . "/../../.env");

class DataBase{
    public function conectar(): PDO {
        try{
            $host = $_ENV["BD_HOST"] ?? "localhost";
            $dbName = $_ENV["DB_NAME"] ?? "";
            $user = $_ENV['DB_USER'] ?? "";
            $pass = $_ENV["DB_PASS"] ?? "";
            $charset = $_ENV["DB_CHARSET"] ?? "utf8mb4";

            $dsn = "mysql:host=$host;dbname=$dbName;charset=$charset";

            $pdo = new PDO($dsn, $user, $pass);

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            return $pdo;
        } catch (PDOException $e){
            http_response_code(500);

            echo json_encode([
                "success" => false,
                "message" => "Error de conexión a la base de datos"
            ]);

            exit;
        }
    }
}