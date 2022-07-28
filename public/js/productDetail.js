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


/* Contador */

let counter = 1
let $count = document.getElementById('num');

function add (){
    if(counter <= 10) {
        counter = counter + 1
        $count.innerHTML = `<p>${counter}</p>`
    }
}

function subtract (){
    if(counter > 0) {
        counter = counter - 1
        $count.innerHTML = `<p>${counter}</p>`
    }
}