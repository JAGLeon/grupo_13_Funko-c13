
let eye = document.getElementById('eye');
let pass = document.getElementById('password');

    eye.addEventListener("click",function(){
        if(pass.type == "password"){
            pass.type = "text";
            eye.style.opacity = 0.2;
        }else{
            pass.type = "password";
            eye.style.opacity = 1;
        }
    });
    
    
