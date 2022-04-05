let btnOpenPopup = document.querySelector('.btnOpenPop-up'),
    overlay = document.querySelector('.overlay'),
    popup = document.querySelector('.pop-up'),
    closePopup = document.querySelector('.closePop-up');

btnOpenPopup.addEventListener('click', ()=>{
    overlay.classList.add('active');
    popup.classList.add('active');
});
closePopup.addEventListener('click', ()=>{
    overlay.classList.remove('active');
    popup.classList.remove('active');
})

let btnPopOpen = document.querySelector('#btnPopOpen'),
    overlay2 = document.querySelector('#overlay'),
    popup2 = document.querySelector('#pop-up'),
    closePopup2 = document.querySelector('#closePop-up');

btnPopOpen.addEventListener('click', ()=>{
    overlay2.classList.add('active');
    popup2.classList.add('active');
});
closePopup2.addEventListener('click', ()=>{
    overlay2.classList.remove('active');
    popup2.classList.remove('active');
})