function qs(element) {
    return document.querySelector(element);
};

let $selectProvince = qs('#province'),
$inputName = qs('#name'),
$inputLastName = qs('#lastName'),
$inputUserName = qs('#userName'),
$inputEmail = qs('#email'),
$inputPassword = qs('#password'),
$fileIcon = qs('#icon'),
$fileErrors = qs('#fileErrors'),
$errorsSelect = qs('#errorsSelect'),
$errorsName = qs('#errorsName'),
$errorsLastName = qs('#errorsLastName'),
$errorsUserName = qs('#errorsUserName'),
$errorsEmail = qs('#errorsEmail');

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
        case $inputUserName.value.trim().length < 2:
            $errorsUserName.innerHTML = "Mínimo 2 carácteres";
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
