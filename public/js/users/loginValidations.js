function qs(element) {
    return document.querySelector(element)
}

window.addEventListener("load", () => {
    let $inputEmail = qs('#email'),
    $inputpassword = qs('#password'),
    $emailErrors = qs('#emailErrors'),
    $passErrors = qs('#passwordErrors'),
    $eye = qs('eye'),
    $pass = qs('password'),
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    alert('conect')
    $inputEmail.addEventListener("blur", () => {
        switch (true) {
            case !$inputEmail.value.trim():
                $emailErrors.innerHTML = "El email es requeridoo";
                $inputEmail.classList.add("is-invalid");
                break;
            case !regExEmail.test($inputEmail.value):
                $emailErrors.innerHTML = "El email no es valido";
                $inputEmail.classList.add("is-invalid");
                break;
            default: 
                $inputEmail.classList.remove("is-invalid");
                $inputEmail.classList.add("is-valid");
                $emailErrors.innerHTML = "";
                break;
        }
    })

    $eye.addEventListener("click",function(){
        if($pass.type == "password"){
            $pass.type = "text";
            $eye.style.opacity = 0.2;
        }else{
            $pass.type = "password";
            $eye.style.opacity = 1;
        }
    });
})
