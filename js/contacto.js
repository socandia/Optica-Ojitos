window.addEventListener("DOMContentLoaded", (eventLoad) => {
    document.querySelector("form").addEventListener("submit", (eventoSubmit) => {
        eventoSubmit.preventDefault();
        

        const nombre = $("#nombre").val();
        const apellido = $("#apellido").val();
        const ciudad = $("#ciudad").val();
        const email = $("#email").val();

        const nombreValido=validarNombre(nombre);
        const apellidoValido=validarApellido(apellido);
        const ciudadValido=validarCiudad(ciudad);
        const emailValido=validarEmail(email);
        
        if( nombreValido && apellidoValido && ciudadValido && emailValido ){
            guardarDatosSuscriptor(nombre,apellido,ciudad,email);
        } else {
            mostrarMensajeError();
        }
        return false;
    });

});

function guardarDatosSuscriptor(nombre,apellido,ciudad,email) {
    const urlSupabase = 'https://dqkspymwahscsnhwomfj.supabase.co';
    const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxa3NweW13YWhzY3NuaHdvbWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxMzkxMDYsImV4cCI6MTk2MDcxNTEwNn0.w2yADrC8t36aA46RVR-4P_mdPaqKe-hgLR9Byheb4w4';
    const apiURL = '/rest/v1/Contactos';

    const suscriptor =  {
        nombre,
        apellido,
        ciudad,
        email,
        };
        
    const url = urlSupabase + apiURL;
    const resultadoFetch = fetch(url,{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "apikey": apikey,
            "authorization": "Bearer "+apikey
        },
        body: JSON.stringify( suscriptor)
    }).then( response => {
        if(response.ok) {
            return response.json();
        }else {
            console.error("Error");
        }
    }).then(data => {
        console.dir(data);
    }).catch(err => console.dir(err));
}


function validarNombre(nombre){
    return true
}
function validarApellido(apellido){
    return true
}
function validarCiudad(ciudad){
    return true
}
function validarEmail(email){
    return true
}

