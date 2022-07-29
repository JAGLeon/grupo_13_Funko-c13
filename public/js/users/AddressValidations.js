function qs(element) {
    return document.querySelector(element);
};

let 
$inputAddress = qs('#addressName'),
$errorsAddress = qs('#errorsAddress'),
$inputCity = qs('#city'),
$errorsCity = qs('#errorsCity'),
$inputNumberAddress = qs('#numberAddress'),
$errorsNumberAddress= qs('#errorsNumberAddress'),
$inputCP = qs('#postal_code'),
$errorsCP = qs('#errorsPostal_code'),
$formAddress = qs('#formAddress')
regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;
regExNumber =  /^[0-9]+$/;
    
$inputAddress.addEventListener("blur", () => {
    switch (true) {
        case !$inputAddress.value.trim():
            $errorsAddress.innerHTML = "Ingrese su dirección";
            $inputAddress.classList.add("is-invalid");
            break;
        case $inputAddress.value.trim().length < 2:
            $errorsAddress.innerHTML = "Mínimo 2 carácteres";
            $inputAddress.classList.add("is-invalid");
            break;
        default: 
            $inputAddress.classList.remove("is-invalid");
            $errorsAddress.innerHTML = "";
            break;
    };
});



$inputCity.addEventListener("blur", () => {
    switch (true) {
        case !$inputCity.value.trim():
            $errorsCity.innerHTML = "Ingrese su ciudad";
            $inputCity.classList.add("is-invalid");
            break;
        case $inputCity.value.trim().length < 2:
            $errorsCity.innerHTML = "Mínimo 2 carácteres";
            $inputCity.classList.add("is-invalid");
            break;
        case !regExAlpha.test($inputCity.value):
            $errorsCity.innerHTML = "Ciudad inválida";
            $inputCity.classList.add("is-invalid");
            break;
        default: 
            $inputCity.classList.remove("is-invalid");
            $errorsCity.innerHTML = "";
            break;
    };
});

$inputNumberAddress.addEventListener("blur", () => {
    switch (true) {
        case !$inputNumberAddress.value.trim():
            $errorsNumberAddress.innerHTML = "Ingrese su número de domicilio";
            $inputNumberAddress.classList.add("is-invalid");
            break;
        case $inputNumberAddress.value.trim().length < 1:
            $errorsNumberAddress.innerHTML = "Mínimo 1 carácteres";
            $inputNumberAddress.classList.add("is-invalid");
            break;
        case !regExNumber.test($inputNumberAddress.value):
                $errorsNumberAddress.innerHTML = "Número de domicilio inválido";
                $inputNumberAddress.classList.add("is-invalid");
                break;
        default: 
            $inputNumberAddress.classList.remove("is-invalid");
            $errorsNumberAddress.innerHTML = "";
            break;
    };
});

$inputCP.addEventListener("blur", () => {
    switch (true) {
        case !$inputCP.value.trim():
            $errorsCP.innerHTML = "Ingrese su código postal";
            $inputCP.classList.add("is-invalid");
            break;
        case !regExNumber.test($inputCP.value):
            $errorsCP.innerHTML = "Código Postal invalido";
            $inputCP.classList.add("is-invalid");
            break;
        default: 
            $inputCP.classList.remove("is-invalid");
            $errorsCP.innerHTML = "";
            break;
    };
});


$formAddress.addEventListener("submit", function(event) {

    event.preventDefault()
    let elementsForm = this.elements;
    let errores = false;

    for (let index = 0; index < elementsForm.length - 3; index++) {
        console.log(elementsForm[index]);
        if(elementsForm[index].value == ""
        || elementsForm[index].classList.contains("is-invalid")){
            elementsForm[index].classList.add("is-invalid");
            addressErrors.innerHTML = "Hay errores en el formulario"
            errores = true;
        }
    }

    if(!errores){
        $formAddress.submit()
    }
})