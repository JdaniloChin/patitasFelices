
$(document).ready(function () {
    cargarPropietarios();
    cargarMascotas();

    $("#formAnimal").on("submit", function (event) {
        event.preventDefault();
        guardarMascota();
    });

    $("#btnLimpiar").on("click", function () {
        limpiarFormulario();
    });
});


function limpiarFormulario(){
    $("#formAnimal")[0].reset();
    $("#idMascota").val("");
    mostrarMensaje("info","Complete el formulario para registrar una mascota");

}

function mostrarMensaje(tipo, texto){
    $("#mensaje")
        .removeClass("alert-info alert-success alert-warning alert-danger")
        .addClass("alert-"+tipo)
        .text(texto);
}

function obtenerDatosFormulario() {
    return {
        id_mascota: $("#idMascota").val(),
        nombre: $("#nombre").val().trim(),
        especie: $("#especie").val(),
        raza: $("#raza").val().trim(),
        edad: $("#edad").val().trim(),
        id_propietario: $("#propietario").val(),
        sexo: $("input[name='sexo']:checked").val() || "",
        vacunado: $("#vacunado").is(":checked"),
        observaciones: $("#observaciones").val().trim()
    };
}

function validarMascota(mascota) {
    if (
        mascota.nombre === "" ||
        mascota.especie === "" ||
        mascota.edad === "" ||
        mascota.id_propietario === "" ||
        mascota.sexo === ""
    ) {
        mostrarMensaje("warning", "Debe completar todos los campos obligatorios");
        return false;
    }

    if (isNaN(mascota.edad) || Number(mascota.edad) < 0) {
        mostrarMensaje("warning", "La edad debe ser un número válido");
        return false;
    }

    return true;
}

function cargarPropietarios() {
    $.ajax({
        url: "../app/propietarios/listar.php",
        method: "GET",
        dataType: "json",
        success: function (response) {
            const select = $("#propietario");
            select.empty();
            select.append('<option value="">Seleccione</option>');

            if (!response.success) {
                mostrarMensaje("danger", response.message);
                return;
            }

            response.data.propietarios.forEach(function (propietario) {
                select.append(`
                    <option value="${propietario.id_propietario}">
                        ${propietario.nombre}
                    </option>
                `);
            });
        },
        error: function () {
            mostrarMensaje("danger", "Error al cargar los propietarios");
        }
    });
}

function cargarMascotas() {
    $.ajax({
        url: "../app/mascotas/listar.php",
        method: "GET",
        dataType: "json",
        success: function (response) {
            const tabla = $("#tablaMascotas");
            tabla.empty();

            if (!response.success) {
                mostrarMensaje("danger", response.message);
                return;
            }

            if (response.data.mascotas.length === 0) {
                tabla.append(`
                    <tr>
                        <td colspan="7" class="text-center text-muted">
                            No hay mascotas registradas
                        </td>
                    </tr>
                `);
                return;
            }

            response.data.mascotas.forEach(function (mascota) {
                const vacunadoTexto = Number(mascota.vacunado) === 1 ? "Sí" : "No";

                tabla.append(`
                    <tr>
                        <td>${mascota.nombre}</td>
                        <td>${mascota.especie}</td>
                        <td>${mascota.raza || "-"}</td>
                        <td>${mascota.edad}</td>
                        <td>${mascota.nombre_propietario}</td>
                        <td>${vacunadoTexto}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick='editarMascota(${JSON.stringify(mascota)})'>
                                Editar
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarMascota(${mascota.id_mascota})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function () {
            mostrarMensaje("danger", "Error al cargar las mascotas");
        }
    });
}

function guardarMascota() {
    const mascota = obtenerDatosFormulario();

    if (!validarMascota(mascota)) {
        return;
    }

    const url = mascota.id_mascota === ""
        ? "../app/mascotas/guardar.php"
        : "../app/mascotas/actualizar.php";

    $.ajax({
        url: url,
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(mascota),
        success: function (response) {
            if (!response.success) {
                mostrarMensaje("danger", response.message);
                return;
            }

            mostrarMensaje("success", response.message);
            limpiarFormulario();
            cargarMascotas();
        },
        error: function () {
            mostrarMensaje("danger", "Error al guardar la mascota");
        }
    });
}

function editarMascota(mascota) {
    $("#idMascota").val(mascota.id_mascota);
    $("#nombre").val(mascota.nombre);
    $("#especie").val(mascota.especie);
    $("#raza").val(mascota.raza);
    $("#edad").val(mascota.edad);
    $("#propietario").val(mascota.id_propietario);
    $("#vacunado").prop("checked", Number(mascota.vacunado) === 1);
    $("#observaciones").val(mascota.observaciones);
    $(`input[name='sexo'][value='${mascota.sexo}']`).prop("checked", true);

    mostrarMensaje("info", "Editando mascota: " + mascota.nombre);
}

function eliminarMascota(idMascota) {
    if (!confirm("¿Desea eliminar esta mascota?")) {
        return;
    }

    $.ajax({
        url: "../app/mascotas/eliminar.php",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ id_mascota: idMascota }),
        success: function (response) {
            if (!response.success) {
                mostrarMensaje("danger", response.message);
                return;
            }

            mostrarMensaje("success", response.message);
            cargarMascotas();
        },
        error: function () {
            mostrarMensaje("danger", "Error al eliminar la mascota");
        }
    });
}