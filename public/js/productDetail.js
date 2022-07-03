let arrowPagos = document.querySelector('i#medios');
let arrowDescription = document.querySelector('i#description');
let mediosDePago = document.querySelector('#items');
let description = document.querySelector('#item');

/* eventos */

arrowPagos.addEventListener('click',() => {
    mediosDePago.classList.toggle('active')
});

arrowDescription.addEventListener('click',() => {
   description.classList.toggle('active') 
});