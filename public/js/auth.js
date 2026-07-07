document.addEventListener("DOMContentLoaded", async () =>{
    try{
        const response = await fetch(getAuthPath("session.php"));
        const result = await response.json();

        if (!result.success){
            window.location.href = getLoginpath();
        }
    }catch(error){
        window.location.href = getLoginpath();
    }

    const logoutLinks = document.querySelectorAll(".logout");

    logoutLinks.forEach(link=> {
        link.addEventListener("click", async(e) =>{
            e.preventDefault();

            await fetch(getAuthPath("logout.php"));
            window.location.href = getLoginpath();
        });
    });

});


function getLoginpath(){
    return window.location.pathname.includes("/pages/")
        ? "../index.html"
        : "index.html";
}

function getAuthPath(file){
    return window.location.pathname.includes("/pages/") 
        ? `../app/auth/${file}`
        : `./app/auth/${file}`; 
}