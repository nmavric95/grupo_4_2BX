window.onload = () => {

    let j = new URLSearchParams(location.search);
    let id =+j.get("id"); 

    let formulario = document.querySelector("form");
    formulario.addEventListener('submit', function(event) {

    event.preventDefault();

    let name = document.querySelector("#name")
    let lastName = document.querySelector("#lastName")
    let birthDate = document.querySelector("#birthDate")
    let email = document.querySelector("#email")
    let password = document.querySelector("#password")
    let passwordRepeat = document.querySelector("#passwordRepeat")

    if(name.value.length < 1){
       console.log('Campo Obligatorio')}
      else{
        if(name.value.length >= 2){
           req.body.name
        }
    }

    if(lastName.value.length < 1){
       console.log('Campo Obligatorio')}
        else{
          if(name.value.length >= 2){
             req.body.lastName
        }
    }
    
    if(birthDate.value.length < 1){
        console.log('Campo Obligatorio')}
         else{
             req.body.birthDate
        
    }

    if(email.value.length < 1){
        console.log('Campo Obligatorio')
    }
        

    if(password.value.length < 8)
    {
       console.log('La contraseña debe tener un minimo de 8 caracteres')
    }else{
        if(password.value.length >= 8 )
        bcrypt.hashSync(req.body.password, 8)
    }

    if(passwordRepeat != password.value.length)
    {
       console.log('Debe repetir la contraseña')
    }
  })


}