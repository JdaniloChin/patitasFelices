let animales = [];

const formAnimal = document.getElementById("formAnimal");
const tablaAnimales = document.getElementById("tablaMascotas");
const mensaje = document.getElementById("mensaje");

formAnimal.addEventListener("submit", function(event){
    event.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const especie = document.getElementById("especie").value;
    const edad = document.getElementById("edad").value;
    const propietario = document.getElementById("propietario").value;
    const vacunado = document.getElementById("vacunado").checked;
    const sexoSelect = document.querySelector("input[name='sexo']:checked");
    const sexo = sexoSelect ? sexoSelect.value : " ";
    const indiceEdicion = document.getElementById("idMascota").value;
    const observaciones = document.getElementById("observaciones").value;

    //Validaciones de los campos
    if(nombre === "" || especie  === "" || edad === "" || propietario === "" || sexo === ""){
        mensaje.className = "alert alert-warning";
        mensaje.textContent = "Debe completar todos los campos obligatorios";
        return;
    }

    const animal = {
        nombre : nombre,
        especie : especie,
        edad : edad,
        propietario : propietario,
        sexo : sexo,
        vacunado : vacunado,
        observaciones : observaciones
    }

    if(indiceEdicion === ""){
        animales.push(animal);
        mensaje.className = "alert alert-success";
        mensaje.textContent = "Animal registrado correctamente";
    }else{
        animales[indiceEdicion] = animal;
        mensaje.className = "alert alert-success";
        mensaje.textContent = "Animal actualizado correctamente";
    }

    formAnimal.reset();
    document.getElementById("idMascota").value = "";
    
    //cargar la tabla
    cargarTabla();
});

function cargarTabla(){
    tablaAnimales.innerHTML = "";

    for(let i = 0; i < animales.length; i++){
        const animal = animales[i];
        
        const vacunadoTexto = animal.vacunado ? "Sí" : "No";

        tablaAnimales.innerHTML  += `
            <tr>
                <td>${animal.nombre}</td>
                <td>${animal.especie}</td>
                <td>${animal.edad}</td>
                <td>${animal.propietario}</td>
                <td>${vacunadoTexto}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarAnimal(${i})">
                        Editar
                    </button>

                    <button class="btn btn-danger btn-sm" onclick="eliminarAnimal(${i})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    }
}

function editarAnimal(indice){
    const animal = animales[indice];

    document.getElementById("nombre").value = animal.nombre;
    document.getElementById("especie").value = animal.especie;
    document.getElementById("edad").value = animal.edad;
    document.getElementById("propietario").value = animal.propietario;
    document.getElementById("vacunado").checked = animal.vacunado;
    document.getElementById("idMascota").value = indice;
    document.getElementById("observaciones").value = animal.observaciones;

    const radiosSexo = document.querySelectorAll("input[name='sexo']");

    for(let radio of radiosSexo){
        if(radio.value === animal.sexo){
            radio.checked = true;
        }
    }

    mensaje.className = "alert alert-info";
    mensaje.textContent = "Editando mascota: " + animal.nombre;
}

function eliminarAnimal(indice){
    animales.splice(indice, 1);

    mensaje.className = "alert alert-danger";
    mensaje.textContent = "Animal eliminado Correctamente";

    cargarTabla();
}

function limpiarFormulario(){
    formAnimal.reset();
    document.getElementById("idMascota").value = "";

    mensaje.className = "alert alert-info";
    mensaje.textContent = "Complete el formulario para registrar una mascota.";
}