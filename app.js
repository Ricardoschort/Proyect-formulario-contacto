const emailInput = document.querySelector("#email");
const nameInput = document.querySelector("#name");
const messageInput = document.querySelector("#message");
const emailOtherInput = document.querySelector("#email-others")
const form = document.querySelector(".form");
const sendBtn = document.querySelector(".send");
const resetBnt = document.querySelector(".reset");
const spinner = document.querySelector(".spinner-border")


// eventos
emailInput.addEventListener("input",validate);
nameInput.addEventListener("input",validate);
messageInput.addEventListener("input",validate);
emailOtherInput.addEventListener("input", validate);
resetBnt.addEventListener("click", reset);
sendBtn.addEventListener("click", submit);


// creacion del objeto para su completa verificación

const email = {
  email: "",
  emailOthers:"",
  name: "",
  message:"",
}


// validacion de los campos
function validate(e){
  const ref = e.target.parentElement;
  const nameLabel= e.target.previousElementSibling.textContent
  let respons = e.target.value.trim().toLowerCase();

  if (respons === "" ){
    if(e.target.id !== "email-others"){
      alertRespons(nameLabel,ref, " no esta completado");
      email[e.target.name] ="";
      validatefields();
      return;
    }
    
  }
  if(e.target.id === "email-others" && e.target.value.trim() === ""){
    clearAlert(ref)
    return
    
  }else if(e.target.type === "email" && !validateEmail(e.target.value)){
    alertRespons(nameLabel,ref," no es válido");
    email[e.target.name] ="";
    validatefields();
    
    return
   }

 
  

  email[e.target.name] = e.target.value.trim();
  validatefields();

  clearAlert(ref)



}

function alertRespons(nameLabel,ref,message){
  clearAlert(ref)

  const alert = document.createElement("P");
  alert.textContent =`El campo ${nameLabel} ${message} `;
  alert.classList.add("text-alert");
  ref.appendChild(alert)
   
}

// limpiar alerta 

function clearAlert(ref){
  const alertNote = ref.querySelector(".text-alert");
  if (alertNote){
    alertNote.remove()
  }

}
function clearAlertAll(ref){
  const alertNote = ref.querySelectorAll(".text-alert");
  if (alertNote){
    alertNote.forEach(element => {
      if (element.classList.contains("text-alert") ) {
        element.remove();
      }
    });
  }

}


// validar email

function validateEmail(email){
const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
const result = regex.test(email);
validatefields(result)
return result

}

// validar campos

function validatefields(result){


     
  
  if (email.email === "" || email.message === ""  ||email.name ==="" || emailOtherInput.value !== "" || result === false ){
      sendBtn.classList.add("opacity-50");
       sendBtn.disabled = true;
  }else{
    sendBtn.classList.remove("opacity-50");
    sendBtn.disabled = false;
  }


  
}

// resetear los campos 

function reset(e){
  e.preventDefault()
   clearAlertAll(e.target.parentElement.parentElement)
   resetform();
 
 
 }

 // resetear formulario

function resetform(){
  email.email = "";
  email.emailOthers = "",
  email.name = "";
  email.message= "";

  
  validatefields()
  form.reset();
 }
 // enviar el formulario

 function submit(e){
  e.preventDefault()
  spinner.style.display="flex"

  setTimeout(() => {
    spinner.style.display="none"

    const exitmessage = document.createElement("P");
    exitmessage.textContent ="El mensaje se ha enviado correctamente";
    exitmessage.classList.add("text-good");
    form.appendChild(exitmessage)
    

   resetform();
    setTimeout(()=>{

      exitmessage.remove()
    },1500);
  }, 2000);

 }
