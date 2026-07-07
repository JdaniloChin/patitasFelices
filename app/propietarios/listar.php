<?php
session_start();

require_once "../config/database.php";
require_once "../helpers/response.php";

try {
    $db = new DataBase();
    $pdo = $db->conectar();

    $stmt = $pdo->prepare("
        SELECT 
            p.id_propietario,
            u.nombre,
            u.correo,
            p.telefono,
            p.direccion
        FROM propietarios p
        INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
        WHERE u.estado = 'ACTIVO'
        ORDER BY u.nombre ASC
    ");

    $stmt->execute();
    $propietarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    jsonResponse(true, "Propietarios obtenidos correctamente", [
        "propietarios" => $propietarios
    ]);

} catch (Exception $e) {
    jsonResponse(false, "Error al listar propietarios", [], [$e->getMessage()]);
}
