document.addEventListener("DOMContentLoaded", () =>{
    const registerForm = document.getElementById("registerForm");
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    registerForm.addEventListener("submit", async (e) =>{
        e.preventDefault();

        const data = {
            nombre: document.getElementById("nombre").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            password: document.getElementById("password").value.trim(),
            telefono: document.getElementById("telefono").value.trim(),
            direccion: document.getElementById("direccion").value.trim()
        };

        try{
            const response = await fetch("./app/auth/register.php",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if(!result.success){
                mensajeRegistro.innerHTML= `<div class="alert alert-danger"> ${result.message}<div>`;
                return;
            }

            mensajeRegistro.innerHTML = `<div class="alert alert-success">${result.message}<div>`;

            setTimeout(() => {
                window.location = "index.html";
            }, 1200);
        } catch(error){
            mensajeRegistro.innerHTML= `<div class="alert alert-danger">Error al registrar cliente<div>`;
        }

    });
});