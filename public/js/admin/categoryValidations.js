function qs(element) {
    return document.querySelector(element)
};

window.addEventListener('load', () => {
    let $form = qs('form')
    let $inputName = qs('#name')
    let $nameErrors = qs('#nameErrors')
    let $inputImage = qs('#image')
    let $imageErrors = qs('#imageErrors')

    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/, //para validar si es alfabetico

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
            $imageErrors.innerHTML = 'Archivo de imagen en formato .png, .jpeg, .jpg';
            //$inputImage.value = '';
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






    $form.addEventListener('submit', function(event) {
        event.preventDefault();

        let elementsForm = this.elements; 
        let errores = false;

        
        for (let i = 0; i < elementsForm.length-1; i++) {
            if (elementsForm[i].value == ''
                && elementsForm[i].name !== 'apellido'
                && elementsForm[i].type !== 'file'
                || elementsForm[i].classList.contains('is-invalid')) { 

                elementsForm[i].classList.add('is-invalid');
                submitErrors.innerHTML = 'Hay errores en el formulario';
                errores = true;
            }
        };

        if (!errores) { 
            alert('Validado!');
            $form.submit();
        };
    });


});