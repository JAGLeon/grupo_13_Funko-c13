let menuButton = document.querySelector('.header-btnBars'),
    menu = document.querySelector('.header-navMenu'),
    menuCloseButton = document.querySelector('.header-menuClose');

menuButton.addEventListener('click', () => {
    menu.classList.add('active')
})

menuCloseButton.addEventListener('click', () => {
    menu.classList.remove('active')
})

/*adminUser*/
let btnUser = document.querySelector('.header-btnMenu');
let menuUser = document.querySelector('.header-ulUser');

btnUser.addEventListener('click',()=>{
menuUser.classList.toggle('active')
})

// Productos && Categorias

let btnUser1 = document.querySelector('#header-btnMenu');
let menuUser1 = document.querySelector('#header-ulUser');

btnUser1.addEventListener('click',()=>{
    menuUser1.classList.toggle('active');
});

let btnUser2 = document.querySelector('#header-btnMenu2');
let menuUser2 = document.querySelector('#header-ulUser2');

btnUser2.addEventListener('click',()=>{
    menuUser2.classList.toggle('active');
});