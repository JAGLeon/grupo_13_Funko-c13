function qs(element) {
    return document.querySelector(element)
};

window.addEventListener('load', () => {
    let $inputName = qs('#name')
    let $nameErrors = qs('#nameErrors')
    let $inputPrice = qs('#price')
    let $priceErrors = qs('#priceErrors')
    let $inputDiscount = qs('#discount')
    let $discountErrors = qs('#discountErrors')
    let $inputCategory = qs('#category')
    let $categoryErrors = qs('#categoryErrors')
    let $inputImages = qs('#images')
    let $imagesErrors = qs('#imagesErrors')
    let $inputDescription = qs('#description')
    let $descriptionErrors = qs('#descriptionErrors')
    let $formProduct = qs('#formProduct')

    let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/
    let regExNumeric = /^[0-9][A-Za-z0-9 -]*$/
    let regExNumber0y100 = /(?:\b|-)([0-9]{1,2}|100)\b/

    $inputName.addEventListener('blur', () => {
        switch (true) {
            case !$inputName.value.trim(): 
                $nameErrors.innerHTML = 'El nombre es requerido';
                $inputName.classList.add('is-invalid');
                break;
            case !regExAlpha.test($inputName.value):
                $nameErrors.innerHTML = 'Ingresa un nombre válido';
                $inputName.classList.add('is-invalid');
                break;
            case $inputName.value.trim().length < 5:
                $nameErrors.innerHTML = 'El nombre debe tener al menos 5 caracteres';
                $inputName.classList.add('is-invalid');
                break;
            default:
                $inputName.classList.remove('is-invalid');
                $inputName.classList.add('is-valid');
                $nameErrors.innerHTML = '';
                break;
        }
    });

    $inputPrice.addEventListener('blur', () => {
        switch (true) {
            case !$inputPrice.value.trim(): 
                $priceErrors.innerHTML = 'Ingresa un precio';
                $inputPrice.classList.add('is-invalid');
                break;
            case !regExNumeric.test($inputPrice.value):
                $priceErrors.innerHTML = 'Sólo números';
                $inputPrice.classList.add('is-invalid');
                break;
            default:
                $inputPrice.classList.remove('is-invalid');
                $inputPrice.classList.add('is-valid');
                $priceErrors.innerHTML = '';
                break;
        }
    });

    $inputDiscount.addEventListener('blur', () => {
        switch (true) {
            case !regExNumber0y100.test($inputDiscount.value) || !regExNumeric.test($inputDiscount.value):
                $discountErrors.innerHTML = 'El descuento debe tener un valor entre 0 y 100';
                $inputDiscount.classList.add('is-invalid');
                break;
            default:
                $inputDiscount.classList.remove('is-invalid');
                $inputDiscount.classList.add('is-valid');
                $discountErrors.innerHTML = '';
                break;
        }
    });

    $inputCategory.addEventListener('blur', () => {
        switch (true) {
            case !$inputCategory.value.trim(): 
                $categoryErrors.innerHTML = 'Selecciona una franquicia';
                $inputCategory.classList.add('is-invalid');
                break;
            default:
                $inputCategory.classList.remove('is-invalid');
                $inputCategory.classList.add('is-valid');
                $categoryErrors.innerHTML = '';
                break;
        }
    });

    $inputImages.addEventListener('change', function fileValidation(){
        let filePath = $inputImages.value, 
            allowefExtensions = /(.jpg|.jpeg|.png)$/i
        if(!allowefExtensions.exec(filePath)){ 
            $imagesErrors.innerHTML = 'Carga un archivo de imagen válido(.jpg - .jpeg - .png)';
            $inputImages.value = '';
            return false;
        } else {
            if($inputImages.files && $inputImages.files[0]){
                let reader = new FileReader();
                reader.readAsDataURL($inputImages.files[0]);
                $imagesErrors.innerHTML = '';
                $inputImages.classList.remove('is-invalid')
            }
        }
    });


    $inputDescription.addEventListener('blur', () => {
        switch (true) {
            case !$inputDescription.value.trim(): 
                $descriptionErrors.innerHTML = 'Ingresa una descripción';
                $inputDescription.classList.add('is-invalid');
                break;
            default:
                $inputDescription.classList.remove('is-invalid');
                $inputDescription.classList.add('is-valid');
                $descriptionErrors.innerHTML = '';
                break;
        }
    });

    $formProduct.addEventListener("submit", function(event) {

        event.preventDefault()
        let elementsForm = this.elements;
        let errores = false;

        console.log(elementsForm)

        for (let index = 0; index < elementsForm.length -1; index++) {
            if(elementsForm[index].value == ""
            || elementsForm[index].classList.contains("is-invalid")){
                elementsForm[index].classList.add("is-invalid");
                fullErrors.innerHTML = "Hay errores en el formulario"
                errores = true;
            }
        }

        if(!errores){
            $formProduct.submit()
        }
    });
});