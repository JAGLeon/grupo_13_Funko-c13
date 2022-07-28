const BASE_URL = window.location.origin

let $addOk = document.querySelector(".producto-agregado-ok");
let $addCart = document.querySelector("#productoComprado");
let $deleteOk = document.querySelector(".producto-eliminado");

function addToCart(productId, quantity = 1, user){
    fetch(`${BASE_URL}/api/carrito/${productId}/${quantity}/${user}`, {method: "POST"})
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            throw {
                errorMsg: "Ocurrió un error"
            }
        }
    })
    .then(result => {
        // if(result.status === 200 || result.status === 201){
            setTimeout(() => {
                $addOk.style.display = "flex";
                setTimeout(() => {
                    $addOk.style.display = "none";
                    window.location.reload();
                }, 1000)
            }, 500);
        // }
    })
    .catch(error => alert(`${error.errorMsg}`))
};

function removeOne(productId, user){
    fetch(`${BASE_URL}/api/carrito/eliminarUno/${productId}/${user}`, {method: "DELETE"})
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            throw {
                errorMsg: "Ocurrió un error"
            }
        };
    })
    .then(result => {
        // if(result.status === 200){
            setTimeout(() => {
                $deleteOk.style.display = "flex";
                setTimeout(() => {
                    $deleteOk.style.display = "none";
                }, 1500)
            }, 500);

            window.location.reload();
        // };
    })
    .catch(error => alert(`${error.errorMsg}`))
};

function removeAll(productId, user){
    fetch(`${BASE_URL}/api/carrito/eliminarTodo/${productId}/${user}`, {method: "DELETE"})
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            throw {
                errorMsg: "Ocurrió un error"
            }
        };
    })
    .then(result => {
        // if(result.status === 200){
            setTimeout(() => {
                $deleteOk.style.display = "flex";
                setTimeout(() => {
                    $deleteOk.style.display = "none";
                    window.location.reload();
                }, 1000)
            }, 300);
        // };
    })
    .catch(error => alert(`${error.errorMsg}`))
};

function clearCart(user){
    fetch(`${BASE_URL}/api/carrito/limpiarCarrito/${user}`, {method: "DELETE"})
    .then(res => {
        if(res.ok){
            return res.json()
        }else{
            throw {
                errorMsg: "Ocurrió un error"
            }
        };
    })
    .then(result => {
        // if(result.status == 200){
            setTimeout(() => {
                $deleteOk.style.display = "flex";
                setTimeout(() => {
                    $deleteOk.style.display = "none";
                    window.location.reload();
                }, 1000)
            }, 300);
        // };
    })
    .catch(error => alert(`${error.errorMsg}`))
};


function buyCart(carritoOrder,user){
    fetch(`${BASE_URL}/api/carrito/comprar/${carritoOrder}/${user}`, {method: "DELETE"})
    .then(res => {
            console.log(res + "SOY UN RES LUEGO DEL THEN");
        if(res.ok){
            console.log(res + "SOY UN RES EN OK");
            return res.json()
        }else{
            throw {
                errorMsg: "Ocurrió un error"
            }
        };
    })
    .then(result => {
        // if(result.status == 200){
            setTimeout(() => {
                $addCart.style.display = "flex";
                setTimeout(() => {
                    $addCart.style.display = "none";
                    window.location.reload();
                }, 1000)
            }, 300);
        // };
    })
    .catch(error => alert(`${error.errorMsg}`))
};
