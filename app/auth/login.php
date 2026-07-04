<?php

session_start();

require_once "../config/database.php";
require_once "../helpers/response.php";

$input = json_decode(file_get_contents("php://input",true));

$correo = trim($input["correo"] ?? "");
$password = trim($input["password"] ?? "");

if($correo === "" || $password === ""){
    jsonResponse(false,"Correo y contraseña son obligatorios");
}

$db = new DataBase();
$pdo = $db->conectar();

$stmt = $pdo->prepare("
    SELECT id_usuario, nombre, correo, passwod_hash, rol, estado
    FROM usuarios
    WHERE correo = ?
    LIMIT 1
");

$stmt->execute([$correo]);

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$usuario || !password_verify($password, $usuario["password_hash"])){
    jsonResponse(false, "Credenciales incorrectas");
}

$_SESSION["usuario"] = [
    "id_usuario" => $usuario["id_usuario"],
    "nombre" => $usuario["nombre"],
    "correo" => $usuario["correo"],
    "rol" => $usuario["rol"]
];

jsonResponse(true,"Inicio sessión correcto",[
    "usuario" => $_SESSION["usuario"];
]);


