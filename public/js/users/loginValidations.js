function qs(element) {
    return document.querySelector(element)
}
    let $inputEmail = qs('#email'),
    $inputpassword = qs('#password'),
    $emailErrors = qs('#emailErrors'),
    $passErrors = qs('#passwordErrors'),
    $eye = qs('#eye'),
    $pass = qs('#password'),
    $form = qs('#formLogin'),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    $inputEmail.addEventListener("blur", (e) => {
        switch (true) {
            case !$inputEmail.value.trim():
                $emailErrors.innerHTML = "Se debe ingrasar un email";
                $inputEmail.classList.add("is-invalid");
                break;
            case !regExEmail.test($inputEmail.value):
                $emailErrors.innerHTML = "El email no es valido";
                $inputEmail.classList.add("is-invalid");
                break;
            default: 
                $inputEmail.classList.remove("is-invalid");
                $emailErrors.innerHTML = "";
                break;
        }
    });

    $inputpassword.addEventListener("blur", (e) => {
        switch (true) {
            case !$inputpassword.value.trim():
                $passErrors.innerHTML = "Se debe ingrasar una contraseña";
                $inputpassword.classList.add("is-invalid");
                break;
            case !true: //Debo validar que la contrasea sea la misma
                $inputpassword.classList.add("is-invalid");
                break;
            default: 
                $inputpassword.classList.remove("is-invalid");
                $passErrors.innerHTML = "";
                break;
        }
    });

    $eye.addEventListener("click",() => {
        if($pass.type == "password"){
            $pass.type = "text";
            $eye.style.opacity = 0.2;
        }else{
            $pass.type = "password";
            $eye.style.opacity = 1;
        }
    });

    $form.addEventListener("submit", function(event) {

        event.preventDefault()
        let elementsForm = this.elements;
        let errores = false;

        console.log(elementsForm)

        for (let index = 0; index < elementsForm.length - 1; index++) {
            if(elementsForm[index].value == ""
            || elementsForm[index].classList.contains("is-invalid")){
                elementsForm[index].classList.add("is-invalid");
                fullErrors.innerHTML = "Email o contraseña erronea"
                errores = true;
            }
        }

        if(!errores){
            $form.submit()
        }
    })
