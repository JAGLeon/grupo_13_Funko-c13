let menuButton = document.querySelector('.header-btnBars'),
    menu = document.querySelector('.header-navMenu'),
    menuCloseButton = document.querySelector('.header-menuClose');

menuButton.addEventListener('click', () => {
    menu.classList.add('active')
})

menuCloseButton.addEventListener('click', () => {
    menu.classList.remove('active')
})

/*User*/
let btnUser = document.querySelector('.header-btnMenu');
let menuUser = document.querySelector('.header-ulUser');

btnUser.addEventListener('click',()=>{
menuUser.classList.toggle('active')
})


//Categorias NO ADMIN

let btnCat = document.querySelector('#btnCat');
let categorias = document.querySelector('#despliegueCat');

btnCat.addEventListener('click',()=>{
    categorias.classList.toggle('active');
});
