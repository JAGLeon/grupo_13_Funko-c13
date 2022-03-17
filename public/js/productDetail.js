let arrowPagos = document.querySelector('i#medios');
let arrowDescription = document.querySelector('i#description');
let mediosDePago = document.querySelector('#items');
let description = document.querySelector('#item');

/* eventos */

arrowPagos.addEventListener('click', function () {
    mediosDePago.classList.toggle('active')
});

arrowDescription.addEventListener('click', function () {
   description.classList.toggle('active') 
});