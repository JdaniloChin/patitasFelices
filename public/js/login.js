//var tradicional / menos estricta / puede ocacionar errores / vive en todo el script 
//let moderna / alcance delimitado /vive solo en el bloque donde fue creada

$(document).ready(function() {

    $("#btnVerPassword").click(function() {
        const inputPassword = $("#password");

        if(inputPassword.attr("type") === "password"){
            inputPassword.attr("type", "text");
            $(this).html('<i class="bi bi-eye-slash"></i>');
        }else {
            inputPassword.attr("type", "password");
            $(this).html('<i class="bi bi-eye"></i>');
        }
    });

    $("#loginForm").submit(function(e){
        e.preventDefault();

        const correo = $("#email").val().trim();
        const password = $("#password").val().trim();

        $("#mensajeLogin").html("");

        $("#btnLogin").prop("disabled", true);
        $("#textoBoton").html(`
            <span class="spinner-border spinner-border-sm me-2"></span>
            Validando...
        `);

        $.ajax({
            url: "./app/auth/login.php",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                correo: correo,
                password: password
            }),
            success: function(result){
                if(result.success){
                    $("#mensajeLogin").html(`
                        <div class="alert alert-success">
                            Login correcto. Redirigiendo...
                        </div>    
                    `);

                    setTimeout(function(){
                        window.location.href ="home.html";
                    }, 1000);
                }else{
                    $("#mensajeLogin").html(`
                        <div class="alert alert-danger">
                            ${result.message}
                        </div>    
                    `);

                    restaurarBotonLogin();
                }
            },
            error: function(xhr, status, error) {
                console.log("status:", status);
                console.log("error:", error);
                console.log("respuesta php:", xhr.responseText);
                $("#mensajeLogin").html(`
                    <div class="alert alert-danger">
                            Error al conectar con el servidor
                        </div> 
                `);
                restaurarBotonLogin();
            }
        });

    });

});


function restaurarBotonLogin(){
    $("#btnLogin").prop("disabled", false);
    $("#textoBoton").text("Ingresar");
}