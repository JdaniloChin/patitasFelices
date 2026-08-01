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

        if(!str_contains($linea, "=")){
            continue;
        }

        [$clave, $valor] = explode("=", $linea, 2);

        $clave = trim($clave);
        $valor = trim($valor);

        //evitar sobrescribir variable docker
        if(getenv($clave) !== false){
            continue;
        }

        $_ENV[trim($clave)] = trim($valor);
        putenv("{$clave}={$valor}");
    }

    
}
