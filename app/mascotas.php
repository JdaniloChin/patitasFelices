<?php 
    echo "Hola Mundo";

    $nombre = "Danilo";
    $edad = 34;

    echo "<br>" . $nombre;
    echo  "<br>" . $edad;

    if($edad>= 18){
        echo "<br> Mayor de edad"; 
    }else{
         echo "<br> Menor de edad"; 
    }

    $animales = ["Nala", "Oslo", " Chester"];

    foreach($animales as $animal){
        echo "<br>" . $animal;
    }
?>