<?php
session_start();

require_once "../config/database.php";
require_once "../helpers/response.php";

$input = json_decode(file_get_contents("php://input"), true);

$idPropietario = trim($input["id_propietario"] ?? "");
$nombre = trim($input["nombre"] ?? "");
$especie = trim($input["especie"] ?? "");
$raza = trim($input["raza"] ?? "");
$edad = trim($input["edad"] ?? "");
$sexo = trim($input["sexo"] ?? "");
$vacunado = !empty($input["vacunado"]) ? 1 : 0;
$observaciones = trim($input["observaciones"] ?? "");

if ($idPropietario === "" || $nombre === "" || $especie === "" || $edad === "" || $sexo === "") {
    jsonResponse(false, "Debe completar todos los campos obligatorios");
}

if (!is_numeric($idPropietario)) {
    jsonResponse(false, "El propietario seleccionado no es válido");
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

    $stmt = $pdo->prepare("SELECT id_propietario FROM propietarios WHERE id_propietario = ?");
    $stmt->execute([$idPropietario]);

    if (!$stmt->fetch()) {
        jsonResponse(false, "El propietario no existe");
    }

    $stmt = $pdo->prepare("
        INSERT INTO mascotas
            (id_propietario, nombre, especie, raza, edad, sexo, vacunado, observaciones)
        VALUES
            (?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $idPropietario,
        $nombre,
        $especie,
        $raza,
        (int)$edad,
        $sexo,
        $vacunado,
        $observaciones
    ]);

    jsonResponse(true, "Mascota registrada correctamente");

} catch (Exception $e) {
    jsonResponse(false, "Error al registrar la mascota", [], [$e->getMessage()]);
}