<?php
    session_start();
    session_destroy();

    require_once "../helpers/response.php";

    jsonResponse(true, "Session cerrada correctamente");