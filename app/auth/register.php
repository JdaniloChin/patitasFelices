<?php
 session_start();

 require_once "../config/database.php";
 require_once "../helpers/response.php";

 $input = json_decode(file_get_contents("php://input"), true);

 $nombre = trim($input["nombre"] ?? "");
 $correo = trim($input["correo"] ?? "");
 $password = trim($input["password"] ?? "");
 $telefono = trim($input["telefono"] ?? "");
 $direccion = trim($input["direccion"] ?? "");

 if($nombre === "" || $correo === "" || $password === "" ){
    jsonResponse(false, "Nombre, correo y contraseña son bligatorios");
 }

 if(!filter_var($correo, FILTER_VALIDATE_EMAIL)){
    jsonResponse(false, "El correo electrónico no es válido");
 }

 if(strlen($password) < 6){
    jsonResponse(false, "La contraseña debe tener al menos 6 caracteres");
 }

 $db = new DataBase();
 $pdo = $db->conectar();

 try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("SELECT id_usuario FROM usuarios WHERE correo = ?");
    $stmt->execute([$correo]);

    if($stmt->fetch()){
        jsonResponse(false, "Ya existe un usuario con ese correo");
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("
        INSERT INTO usuarios (nombre, correo,password_hash, rol)
        VALUES (?,?,?, 'CLIENTE')
    ");

    $stmt->execute([$nombre, $correo, $hash]);

    $idUsuario = $pdo->lastInsertId();

    $stmt = $pdo->prepare("
        INSERT INTO propietarios (id_usuario, telefono, direccion)
        VALUES(?,?,?)
    ");

    $stmt->execute([$idUsuario,$telefono,$direccion]);

    $pdo->commit();

    jsonResponse(true,"Cliente registrado correctamente");
    
 } catch(Exception $e){
    $pdo->rollBack();
    jsonResponse(false, "Error al registrar el cliente");
 }