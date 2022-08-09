window.onload = () => {


    // let j = new URLSearchParams(location.search);
    // let id =+j.get("id"); 

    let form = document.querySelector("form");
    let btnSubmit = document.querySelector(".btnSubmit")
    btnSubmit.disabled = true

    // form.activityName.focus()


    let validationName = document.querySelector("#activityName")
    let validationNotEmpty = [document.querySelector("#sport"), document.querySelector("#startTime"), document.querySelector("#endTime"), document.querySelector("#geoRegion"), document.querySelector("#price"), document.querySelector("#reservationPrice")]
    let validationDescription = document.querySelector("#description")
    let validationImage = document.querySelector("#image")
    let haveErrors = 0

    validationName.addEventListener("blur", (e) => {
            if(
                e.target.value.length < 5 && !e.target.classList.contains("isInvalid")
            ){
                e.target.classList.add("isInvalid")
                haveErrors++
                e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>El campo debe tener al menos 5 caracteres<i class='fa-solid fa-angles-up'></i></p>")
            }
            if(
                e.target.value.length >=5 && e.target.classList.contains("isInvalid")
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
   

    validationNotEmpty.forEach((input) => {
        input.addEventListener("blur", (e) => {
            if(
                e.target.value.length == 0 && !e.target.classList.contains("isInvalid") 
            ){
                e.target.classList.add("isInvalid")
                haveErrors++
                e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>Este campo es obligatorio<i class='fa-solid fa-angles-up'></i></p>")
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
    })

    validationDescription.addEventListener("blur", (e) => {
        if(
            e.target.value.length < 20  && !e.target.classList.contains("isInvalid")
        ){
            e.target.classList.add("isInvalid")
            haveErrors++
            e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>La descripción debe tener al menos 20 caracteres<i class='fa-solid fa-angles-up'></i></p>")
        }
        if(
            e.target.value.length >=20 && e.target.classList.contains("isInvalid")
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

    validationImage.addEventListener("change", (e) => {
        let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i
        if(
            allowedExtensions.exec(e.target.value)  && !e.target.classList.contains("isInvalid")
        ){
            e.target.classList.add("isInvalid")
            haveErrors++
            e.target.insertAdjacentHTML("afterend", "<p class='warning message'><i class='fa-solid fa-angles-up'></i>La imagen debe ser .jpg/ .jpeg/ .png o .gif<i class='fa-solid fa-angles-up'></i></p>")
        }
        if(
            allowedExtensions.exec(e.target.value)  && e.target.classList.contains("isInvalid")
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