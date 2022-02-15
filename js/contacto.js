document.getElementById("nombre").addEventListener("blur",(evento)=>{
const input = evento.currentTarget;
const txtNombre = input.value;

const feedbackNombre=document.getElementById("feedback-nombre");

if(txtNombre.length<3){
    feedbackNombre.innerHTML(textErr)="El nombre es muy corto";
    } else {
    feedbackNombre.innerHTML(textOK)="El nombre está bien";
    }
});