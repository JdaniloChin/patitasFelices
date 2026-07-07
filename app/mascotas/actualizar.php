<?php
session_start();

require_once "../config/database.php";
require_once "../helpers/response.php";

$input = json_decode(file_get_contents("php://input"), true);

$idMascota = trim($input["id_mascota"] ?? "");
$idPropietario = trim($input["id_propietario"] ?? "");
$nombre = trim($input["nombre"] ?? "");
$especie = trim($input["especie"] ?? "");
$raza = trim($input["raza"] ?? "");
$edad = trim($input["edad"] ?? "");
$sexo = trim($input["sexo"] ?? "");
$vacunado = !empty($input["vacunado"]) ? 1 : 0;
$observaciones = trim($input["observaciones"] ?? "");

if ($idMascota === "" || $idPropietario === "" || $nombre === "" || $especie === "" || $edad === "" || $sexo === "") {
    jsonResponse(false, "Debe completar todos los campos obligatorios");
}

if (!is_numeric($idMascota) || !is_numeric($idPropietario)) {
    jsonResponse(false, "Los datos enviados no son válidos");
}

if (!is_numeric($edad) || (int)$edad < 0) {
    jsonResponse(false, "La edad debe ser un número válido");
}

if (!in_array($sexo, ["Macho", "Hembra"])) {
    jsonResponse(false, "El sexo seleccionado no es válido");
}

try {
    $db = new DataBase();
    $pdo = $db->conectar();

    $stmt = $pdo->prepare("SELECT id_mascota FROM mascotas WHERE id_mascota = ?");
    $stmt->execute([$idMascota]);

    if (!$stmt->fetch()) {
        jsonResponse(false, "La mascota no existe");
    }

    $stmt = $pdo->prepare("SELECT id_propietario FROM propietarios WHERE id_propietario = ?");
    $stmt->execute([$idPropietario]);

    if (!$stmt->fetch()) {
        jsonResponse(false, "El propietario no existe");
    }

    $stmt = $pdo->prepare("
        UPDATE mascotas
        SET id_propietario = ?,
            nombre = ?,
            especie = ?,
            raza = ?,
            edad = ?,
            sexo = ?,
            vacunado = ?,
            observaciones = ?
        WHERE id_mascota = ?
    ");

    $stmt->execute([
        $idPropietario,
        $nombre,
        $especie,
        $raza,
        (int)$edad,
        $sexo,
        $vacunado,
        $observaciones,
        $idMascota
    ]);

    jsonResponse(true, "Mascota actualizada correctamente");

} catch (Exception $e) {
    jsonResponse(false, "Error al actualizar la mascota", [], [$e->getMessage()]);
}
