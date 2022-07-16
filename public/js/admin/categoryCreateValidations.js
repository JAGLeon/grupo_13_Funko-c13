function qs(element) {
    return document.querySelector(element)
};

window.addEventListener('load', () => {
    let $formCategory = qs('#formCategory')
    let $inputName = qs('#name')
    let $nameErrors = qs('#nameErrors')
    let $inputImage = qs('#image')
    let $imageErrors = qs('#imageErrors')

    let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/ //para validar si es alfabetico

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

    $inputImage.addEventListener('change', function fileValidation(){
        let filePath = $inputImage.value, 
            allowefExtensions = /(.jpg|.jpeg|.png)$/i
        if(!allowefExtensions.exec(filePath)){ 
            $imageErrors.innerHTML = 'Carga un archivo de imagen válido(.jpg - .jpeg - .png)';
            $inputImage.value = '';
            return false;
        } else {
            if($inputImage.files && $inputImage.files[0]){
                let reader = new FileReader();
                reader.readAsDataURL($inputImage.files[0]);
                $imageErrors.innerHTML = '';
                $inputImage.classList.remove('is-invalid')
            }
        }
    });


    $formCategory.addEventListener("submit", function(event) {

        event.preventDefault()
        let elementsForm = this.elements;
        let errores = false;

        console.log(elementsForm)

        for (let index = 0; index < elementsForm.length - 1; index++) {
            if(elementsForm[index].value == ""
            || elementsForm[index].classList.contains("is-invalid")){
                elementsForm[index].classList.add("is-invalid");
                fullErrors.innerHTML = "Hay errores en el formulario"
                errores = true;
            }
        }

        if(!errores){
            $formCategory.submit()
        }
    });

});