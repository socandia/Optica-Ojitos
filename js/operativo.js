document.getElementById("nombre").addEventListener("blur", (evento) => {
 
    const input = evento.currentTarget;
 
    const txtNombre = input.value;
  
   
    const feedbackNombre = document.getElementById("feedback-nombre");
  

    expr = /^[a-z A-Z]{3,30}$/;
 
    if (!expr.test(txtNombre)){
      feedbackNombre.innerHTML = "El Nombre es invalido.";
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      feedbackNombre.className = "invalid-feedback";
    } else {
      feedbackNombre.innerHTML = "El Nombre es valido";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      feedbackNombre.className = "valid-feedback";
    }
  });

  document.getElementById("apellido").addEventListener("blur", (evento) => {
 
    const input = evento.currentTarget;
 
    const txtApellido = input.value;
  
   
    const feedbackApellido = document.getElementById("feedback-apellido");
  

    expr = /^[a-z A-Z]{3,30}$/;
 
    if (!expr.test(txtApellido)){
      feedbackApellido.innerHTML = "El Apellido es invalido.";
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      feedbackApellido.className = "invalid-feedback";
    } else {
      feedbackApellido.innerHTML = "El Apellido es valido";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      feedbackApellido.className = "valid-feedback";
    }
  });

  document.getElementById("numero").addEventListener("blur", (evento) => {
 
    const input = evento.currentTarget;
 
    const txtNumero = input.value;
  
   
    const feedbackNumero = document.getElementById("feedback-numero");
  

    expr = /^[+ 0-9 ]{6,15}$/;
 
    if (!expr.test(txtNumero)){
      feedbackNumero.innerHTML = "El Número es invalido.";
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      feedbackNumero.className = "invalid-feedback";
    } else {
      feedbackNumero.innerHTML = "El Número es valido";
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      feedbackNumero.className = "valid-feedback";
    }
  });

  document.getElementById("edad").addEventListener("blur", (e) => {
	const edad = parseInt( document.getElementById("edad").value );
    const feedbackEdad = document.getElementById("feedback-edad");

    // NaN (not a number) 
    if( isNaN(edad) ) {
        // es que hay un error en lo que introdujo el usuario
        feedbackEdad.innerHTML = "No es un numero.";
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      feedbackEdad.className = "invalid-feedback";
    }
    
    if( edad > 7 && edad < 66) {
        feedbackEdad.innerHTML = "Edad valida.";
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        feedbackEdad.className = "invalid-feedback";   
     } else {
        feedbackEdad.innerHTML = "Ud. debe ser derivado.";
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        feedbackEdad.className = "invalid-feedback";         
    }
});

    document.getElementById("correo").addEventListener("blur", (evento) => {
        
        const input = evento.currentTarget;
    
        const txtCorreo = input.value;
    
    
        const feedbackCorreo = document.getElementById("feedback-correo");
    
    
        if (txtCorreo.length < 10) {  //No debe tener un largo menos a "@gmail.com" (10 caracteres)
        feedbackCorreo.innerHTML = "El Correo es invalido.";
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
        feedbackCorreo.className = "invalid-feedback";
        } else {
        feedbackCorreo.innerHTML = "El Correo es valido";
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
        feedbackCorreo.className = "valid-feedback";
        }
    });


    // Integración con Supabase

    window.addEventListener("DOMContentLoaded", (eventLoad) => {
        document.querySelector("form").addEventListener("submit", (eventoSubmit) => {
            eventoSubmit.preventDefault();
            
            const rut = $("#rut").val();
            const nombre = $("#nombre").val();
            const apellido = $("#apellido").val();
            const numero = $("#numero").val();
            const edad = $("#edad").val();
            const correo = $("#correo").val();
     //       const diabetes = $( "#diabetes" ).on( "click", function() {
     //           $( "#log" ).html( $( "diabetes:checked" ).val());
     //         });
            const comentario = $("#comentario").val();

            const rutValido=validarRut(rut);
            const nombreValido=validarNombre(nombre);
            const apellidoValido=validarApellido(apellido);
            const numeroValido=validarNumero(numero);
            const edadValido=validarEdad(edad);
            const correoValido=validarCorreo(correo);
      //    const diabetesValido=validarDiabetes(diabetes);
            const comentarioValido=validarComentario(comentario);
            
            if( rutValido && nombreValido && apellidoValido && numeroValido && edadValido && correoValido && diabetesValido && comentarioValido ){
                guardarDatosSuscriptor(rut,nombre,apellido,numero,edad,correo,comentario);
            } else {
                mostrarMensajeError();
            }
            return false;
        });
    
    });
    
    function guardarDatosSuscriptor(rut,nombre,apellido,numero,edad,correo,diabetes,comentario) {
        const urlSupabase = 'https://dqkspymwahscsnhwomfj.supabase.co';
        const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxa3NweW13YWhzY3NuaHdvbWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxMzkxMDYsImV4cCI6MTk2MDcxNTEwNn0.w2yADrC8t36aA46RVR-4P_mdPaqKe-hgLR9Byheb4w4';
        const apiURL = '/rest/v1/operativo';  // reemplazar con el nombre de su tabla
    
        const suscriptor =  {
            rut,
            nombre,
            apellido,
            numero,
            edad,
            correo,
            diabetes,
            comentario
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
    
    
    function validarRut(rut){
        return true
    }
    function validarNombre(nombre){
        return true
    }
    function validarApellido(apellido){
        return true
    }
    function validarNumero(numero){
        return true
    }
    function validarEdad(edad){
        return true
    }
    function validarCorreo(correo){
        return true
    }
    function validarDiabetes(diabetes){
        return true
    }
    function validarComentario(comentario){
        return true
    }