window.onload = () => {

    // let j = new URLSearchParams(location.search);
    // let id =+j.get("id"); 

    let form = document.querySelector("form");
    let btnSubmit = document.querySelector(".btnSubmit")
    btnSubmit.disabled = true

    form.name.focus()


    let validationName = [document.querySelector("#name"), document.querySelector("#lastName")]
    let validationBirth = document.querySelector("#birthDate")
    let validationEmail = document.querySelector("#email")
    let validationPassword = [document.querySelector("#password"), document.querySelector("#passwordRepeat")]
    let haveErrors = 0

    validationName.forEach((input) => {
        input.addEventListener("blur", (e) => {
            if(
                e.target.value.length < 2 && !e.target.classList.contains("isInvalid")
            ){
                e.target.classList.add("isInvalid")
                haveErrors++
                e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>El campo debe tener al menos 2 caracteres<i class='fa-solid fa-angles-up'></i></p>")
            }
            if(
                e.target.value.length >=2 && e.target.classList.contains("isInvalid")
            ){
                e.target.classList.remove("isInvalid")
                e.target.nextElementSibling.remove()
                haveErrors--
            }
            if(!haveErrors){
                btnSubmit.disabled= false
            }else{
                btnSubmit.disabled = true
            }
        })
    })

    validationPassword.forEach((input) => {
        input.addEventListener("blur", (e) => {
            if(
                e.target.value.length < 8 && !e.target.classList.contains("isInvalid") 
            ){
                e.target.classList.add("isInvalid")
                haveErrors++
                e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>La contraseña debe tener al menos 8 caracteres<i class='fa-solid fa-angles-up'></i></p>")
            }
            // if(validationPassword[0].value != validationPassword[1].value && !e.target.classList.contains("isInvalid")){
            //     e.target.classList.add("isInvalid")
            //     haveErrors++
            //     e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>Las claves deben coincidir<i class='fa-solid fa-angles-up'></i></p>")
            // }
            if(
                e.target.value.length >=8 && e.target.classList.contains("isInvalid")
            ){
                e.target.classList.remove("isInvalid")
                e.target.nextElementSibling.remove()
                haveErrors--
            }
            if(!haveErrors){
                btnSubmit.disabled= false
            }else{
                btnSubmit.disabled = true
            }
        })
    })

    validationEmail.addEventListener("blur", (e) => {
        if(
            e.target.value.length < 1  && !e.target.classList.contains("isInvalid")
        ){
            e.target.classList.add("isInvalid")
            haveErrors++
            e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>Debe ingresar un email válido<i class='fa-solid fa-angles-up'></i></p>")
        }
        if(
            e.target.value.length >=1 && e.target.classList.contains("isInvalid")
        ){
            e.target.classList.remove("isInvalid")
            e.target.nextElementSibling.remove()
            haveErrors--
        }
        if(!haveErrors){
            btnSubmit.disabled= false
        }else{
            btnSubmit.disabled = true
        }

    })

    validationBirth.addEventListener("blur", (e) => {
        if(
            e.target.value.length == 0 && !e.target.classList.contains("isInvalid")
        ){
            e.target.classList.add("isInvalid")
            haveErrors++
            e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>Debe ingresar su fecha de nacimiento<i class='fa-solid fa-angles-up'></i></p>")
        }
        if(
            e.target.value.length > 0 && e.target.classList.contains("isInvalid")
        ){
            e.target.classList.remove("isInvalid")
            e.target.nextElementSibling.remove()
            haveErrors--
        }
        if(!haveErrors){
            btnSubmit.disabled= false
        }else{
            btnSubmit.disabled = true
        }
    })
    
    
}
