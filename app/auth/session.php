<?php
    session_start();

    require_once "../helpers/response.php";

    if(!isset($_SESSION['usuario'])){
        jsonResponse(false, "No hay sessión activa");
    }

    jsonResponse(true, "Sessión activa",[
        "usuario" => $_SESSION["usuario"]
    ]);