<?php
session_start();

require_once "../config/database.php";
require_once "../helpers/response.php";

$input = json_decode(file_get_contents("php://input"), true);
$idMascota = trim($input["id_mascota"] ?? "");

if ($idMascota === "" || !is_numeric($idMascota)) {
    jsonResponse(false, "La mascota seleccionada no es válida");
}

try {
    $db = new DataBase();
    $pdo = $db->conectar();

    $stmt = $pdo->prepare("DELETE FROM mascotas WHERE id_mascota = ?");
    $stmt->execute([$idMascota]);

    if ($stmt->rowCount() === 0) {
        jsonResponse(false, "La mascota no existe");
    }

    jsonResponse(true, "Mascota eliminada correctamente");

} catch (Exception $e) {
    jsonResponse(false, "No se puede eliminar la mascota porque tiene información relacionada", [], [$e->getMessage()]);
}
