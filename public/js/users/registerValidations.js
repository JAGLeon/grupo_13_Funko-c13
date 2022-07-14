function qs(element) {
    return document.querySelector(element);
};

let $selectProvince = qs('#province'),
$inputName = qs('#name'),
$inputLastName = qs('#lastName'),
$inputUserName = qs('#userName'),
$inputEmail = qs('#email'),
$inputPassword = qs('#password'),
$formRegister = qs('#formRegister'),
$fileIcon = qs('#icon'),
$fileErrors = qs('#fileErrors'),
$errorsSelect = qs('#errorsSelect'),
$errorsName = qs('#errorsName'),
$errorsLastName = qs('#errorsLastName'),
$errorsUserName = qs('#errorsUserName'),
$errorsEmail = qs('#errorsEmail'),
$errorsPassword = qs('#errorsPassword'),
$eye = qs('#eye'),
$pass = qs('#password'),
regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

fetch("https://apis.datos.gob.ar/georef/api/provincias")
.then(response => response.json())
.then(data => {
    let provinces = data.provincias;
    provinces.sort((prov1,prov2) => {
        let provinceA = prov1.nombre.toLowerCase();
        let provinceB = prov2.nombre.toLowerCase();
        if (provinceA < provinceB) {return -1;} else if (provinceA > provinceB) {return 1;} else {return 0;};
    });
    for (let index = 0; index < provinces.length; index++) {
        $selectProvince.innerHTML += `<option value="${provinces[index].id}">${provinces[index].nombre}</option>`
    };
})
.catch(error => console.log(error));

$selectProvince.addEventListener("blur", () => {
    switch (true) {
        case !$selectProvince.value.trim():
            $errorsSelect.innerHTML = "Seleccione su provincia";
            $selectProvince.classList.add("is-invalid");
            break;
        default: 
            $selectProvince.classList.remove("is-invalid");
            $errorsSelect.innerHTML = "";
            break;
    };
});
    
$inputName.addEventListener("blur", () => {
    switch (true) {
        case !$inputName.value.trim():
            $errorsName.innerHTML = "Ingrese su nombre";
            $inputName.classList.add("is-invalid");
            break;
        case $inputName.value.trim().length < 2:
            $errorsName.innerHTML = "Mínimo 2 carácteres";
            $inputName.classList.add("is-invalid");
            break;
        case !regExAlpha.test($inputName.value):
            $errorsName.innerHTML = "Nombre inválido";
            $inputName.classList.add("is-invalid");
            break;
        default: 
            $inputName.classList.remove("is-invalid");
            $errorsName.innerHTML = "";
            break;
    };
});

$inputLastName.addEventListener("blur", () => {
    switch (true) {
        case !$inputLastName.value.trim():
            $errorsLastName.innerHTML = "Ingrese su apellido";
            $inputLastName.classList.add("is-invalid");
            break;
        case $inputLastName.value.trim().length < 2:
            $errorsLastName.innerHTML = "Mínimo 2 carácteres";
            $inputLastName.classList.add("is-invalid");
            break;
        case !regExAlpha.test($inputLastName.value):
            $errorsLastName.innerHTML = "Apellido inválido";
            $inputLastName.classList.add("is-invalid");
            break;
        default: 
            $inputLastName.classList.remove("is-invalid");
            $errorsLastName.innerHTML = "";
            break;
    };
});

$inputUserName.addEventListener("blur", () => {
    switch (true) {
        case !$inputUserName.value.trim():
            $errorsUserName.innerHTML = "Debe ser completado con su usuario";
            $inputUserName.classList.add("is-invalid");
            break;
        case $inputUserName.value.trim().length < 4:
            $errorsUserName.innerHTML = "Mínimo 4 carácteres";
            $inputUserName.classList.add("is-invalid");
            break;
        default: 
            $inputUserName.classList.remove("is-invalid");
            $errorsUserName.innerHTML = "";
            break;
    };
});

$inputEmail.addEventListener("blur", () => {
    switch (true) {
        case !$inputEmail.value.trim():
            $errorsEmail.innerHTML = "Campo obligatorio complete con su email";
            $inputEmail.classList.add("is-invalid");
            break;
        case !regExEmail.test($inputEmail.value):
            $errorsEmail.innerHTML = "Email inválido";
            $inputEmail.classList.add("is-invalid");
            break;
        default: 
            $inputEmail.classList.remove("is-invalid");
            $errorsEmail.innerHTML = "";
            break;
    };
});

$inputPassword.addEventListener('blur', function(){
    switch (true) {
        case !$inputPassword.value.trim():
            $errorsPassword.innerHTML = 'Campo obligatorio complete con una contraseña';
            $inputPassword.classList.add('is-invalid');
            break;
        case !regExPass.test($inputPassword.value):
            $errorsPassword.innerHTML = 'Mínimo 8 carácteres, debe tener mayúscula, minúscula, número';
            $inputPassword.classList.add('is-invalid');
            break;    
        default:
            $inputPassword.classList.remove("is-invalid");
            $errorsPassword.innerHTML = "";
            break;
    };
});

$fileIcon.addEventListener('change', 
function fileValidation(){
    let filePath = $fileIcon.value,
        allowefExtensions = /(.jpg|.jpeg|.png)$/i 
    if(!allowefExtensions.exec(filePath)){
        $fileErrors.innerHTML = 'Carga un archivo de imagen válido(.jpg - .jpeg - .png)';
        $fileIcon.value = '';
        return false;
    };
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

$formRegister.addEventListener("submit", function(event) {

    event.preventDefault();
    let elementsForm = this.elements;
    let errores = false;

    for (let index = 0; index < elementsForm.length - 1; index++) {
        if(elementsForm[index].value == ""
        && elementsForm[index].type !== "file"
        || elementsForm[index].classList.contains("is-invalid")){
            elementsForm[index].classList.add("is-invalid");
            submitErrors.innerHTML = "Hay errores en el formulario"
            errores = true;
        }
    };

    if(!errores){
        $formRegister.submit()
    };

});