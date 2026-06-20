const formLogin = document.getElementById("loginForm"); //Document Object Model (DOM)
const usuario = document.getElementById("email");
const password = document.getElementById("password");
const btnVerPassword = document.getElementById("btnVerPassword");
const mensajeLogin = document.getElementById("mensajeLogin");

//var tradicional / menos estricta / puede ocacionar errores / vive en todo el script 
//let moderna / alcance delimitado /vive solo en el bloque donde fue creada

btnVerPassword.addEventListener("click", function(){
    if(password.type === "password"){
        password.type = "text";
        btnVerPassword.innerHTML= `<i class="bi bi-eye-slash">`;
    }else{
        password.type = "password";
        btnVerPassword.innerHTML= `<i class="bi bi-eye">`;
    }
});

formLogin.addEventListener("submit", function(event){
    event.preventDefault();
    
    if(usuario.value === "admin@vetpatitasfelices.com" && password.value === "1234"){
        mensajeLogin.innerHTML = `
            <div class="alert alert-success" role="alert">
                Login correcto. Redirigiendo...
            </div>
        `;

        setTimeout(function(){
            window.location.href="home.html";
        }, 1000);
    }else{
       mensajeLogin.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Usuario o contraseña incorrectos.
            </div>
        `; 
    }

});