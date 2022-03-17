let menuButton = document.querySelector('.headerButton-bars');
let menu = document.querySelector('.menu');
let menuCloseButton = document.querySelector('.menuClose');

menuButton.addEventListener('click', () => {
    menu.classList.add('active')
})

menuCloseButton.addEventListener('click', () => {
    menu.classList.remove('active')
})