let preferedColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
let $slider = document.getElementById('slider');
let $bulb = document.querySelector(".fa-lightbulb");

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if(localStorage.getItem('theme') == "light"){
        $bulb.style.filter = "none";
        $bulb.style.opacity = "0.5";
    };
    if(localStorage.getItem('theme') == "dark"){
        $bulb.style.filter = "drop-shadow(0px 0px 10px white)";
        $bulb.style.opacity = "1";
    };
}


$slider.addEventListener("click", () => {
    let switchToTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
    setTheme(switchToTheme);
})

setTheme(localStorage.getItem('theme') || preferedColor);


