<?php
session_start();

require_once "../config/database.php";
require_once "../helpers/response.php";

try {
    $db = new DataBase();
    $pdo = $db->conectar();

    $stmt = $pdo->prepare("
        SELECT
            m.id_mascota,
            m.id_propietario,
            m.nombre,
            m.especie,
            m.raza,
            m.edad,
            m.sexo,
            m.vacunado,
            m.observaciones,
            u.nombre AS nombre_propietario
        FROM mascotas m
        INNER JOIN propietarios p ON m.id_propietario = p.id_propietario
        INNER JOIN usuarios u ON p.id_usuario = u.id_usuario
        ORDER BY m.id_mascota DESC
    ");

    $stmt->execute();
    $mascotas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    jsonResponse(true, "Mascotas obtenidas correctamente", [
        "mascotas" => $mascotas
    ]);

} catch (Exception $e) {
    jsonResponse(false, "Error al listar mascotas", [], [$e->getMessage()]);
}
