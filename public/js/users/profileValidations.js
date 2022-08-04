function qs(element) {
    return document.querySelector(element);
};

let $selectProvince = qs('#province'),
$selectLocalidad = qs('#localidad'),
$inputName = qs('#name'),
$errorsName = qs('#errorsName'),
$inputLastName = qs('#lastName'),
$errorsLastName = qs('#errorsLastName'),
$inputUserName = qs('#userName'),
$errorsUserName = qs('#errorsUserName'),
$inputPhone = qs('#phone'),
$errorsPhone = qs('#errorsPhone'),
$formIcon = qs('#formIcon'),
$file = qs('#icon'),
$imgPreview = qs('#img-preview'),
$fileErrors = qs('#fileErrors'),
$formDatos = qs('#formDatos'),
regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
regExPhone = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;


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

let idProvincia = $selectProvince.value;
$selectLocalidad.innerHTML = `<option value="" hidden selected>Localidades</option>`

fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${idProvincia}&campos=id,nombre&max=5000`)
.then((response) => response.json())
.then((data) => {
    let localidades = data.localidades;
    localidades.sort((local1,local2) => {
        let localidadA = local1.nombre.toLowerCase();
        let localidadB = local2.nombre.toLowerCase();
        if (localidadA < localidadB) {return -1;} else if (localidadA > localidadB) {return 1;} else {return 0;};
    });

    localidades.forEach(localidad => { 
        $selectLocalidad.innerHTML += `<option value="${localidad.nombre}">${localidad.nombre}</option>`
    });
})
.catch((error) => console.log(error))



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

$inputPhone.addEventListener("change", () => {
    switch (true) {
        case !regExPhone.test($inputPhone.value):
            $errorsPhone.innerHTML = "Numero argentos";
            break;
        default: 
            $inputPhone.classList.remove("is-invalid");
            $errorsPhone.innerHTML = "";
            break;
    };
});

$file.addEventListener('change', 
    function fileValidation(){
        let filePath = $file.value, 
            allowefExtensions = /(.jpg|.jpeg|.png)$/i 
        if(!allowefExtensions.exec(filePath)){ 
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido(.jpg - .jpeg - .png)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid')
            }
        }
    }
)

$formDatos.addEventListener("submit", function(event) {

    event.preventDefault();
    let elementsForm = this.elements;
    let errores = false;

    for (let index = 0; index < elementsForm.length - 3; index++) {
        if(elementsForm[index].value == ""
        || elementsForm[index].classList.contains("is-invalid")){
            elementsForm[index].classList.add("is-invalid");
            datosErrors.innerHTML = "Hay errores en el formulario"
            errores = true;
        }
    };

    if(!errores){
        $formDatos.submit()
    };

});



$formIcon.addEventListener("submit", function(event) {

    event.preventDefault();
    let elementsForm = this.elements;
    let errores = false;

    for (let index = 0; index < elementsForm.length - 2; index++) {
        if(elementsForm[index].value == ""
        || elementsForm[index].classList.contains("is-invalid")){
            elementsForm[index].classList.add("is-invalid");
            formIconErrors.innerHTML = "Hay errores en el formulario"
            errores = true;
        }
    };

    if(!errores){
        $formIcon.submit()
    };

});