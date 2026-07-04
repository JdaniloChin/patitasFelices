<?php

function cargarEnv(string $ruta): void{
    if(!file_exists($ruta)){
        return;
    }

    $lineas = file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach($lineas as $linea ){
        if($linea === "" || str_starts_with($linea, "#")){
            continue;
        }
    }

    [$clave, $valor] = explode("=", $linea, 2);
    $_ENV[trim($clave)] = trim($valor);

}
