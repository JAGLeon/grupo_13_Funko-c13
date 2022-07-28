const BASE_URL = window.location.origin

let $addOk = document.querySelector(".producto-agregado-ok");
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
        if(result.status === 200 || result.status === 201){
            setTimeout(() => {
                $addOk.style.opacity = 1;
                setTimeout(() => {
                    $addOk.style.opacity = 0;
                }, 1500)
            }, 500);

            window.location.reload();
        }
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
        if(result.status === 200){
            alert("SE ELIMINO")
            setTimeout(() => {
                $deleteOk.style.opacity = 1;
                setTimeout(() => {
                    $deleteOk.style.opacity = 0;
                }, 1500)
            }, 500);

            window.location.reload();
        };
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
        if(result.status === 200){
            setTimeout(() => {
                $deleteOk.style.opacity = 1;
                setTimeout(() => {
                    $deleteOk.style.opacity = 0;
                }, 1500)
            }, 500);

            window.location.reload();
        };
    })
    .catch(error => alert(`${error.errorMsg}`))
};

function clearCart(user){
    fetch(`${BASE_URL}/api/carrito/limpiarCarrito/${user}`, {method: "DELETE"})
    .then(res => {
        if(res.ok){
            console.log(res + " soy el res");
            return res.json()
        }else{
            throw {
                errorMsg: "Ocurrió un error"
            }
        };
    })
    .then(result => {
        console.log(result + " soy el resultado de producto eliminado"); 
        if(result.status === 200){
            setTimeout(() => {
                $deleteOk.style.opacity = 1;
                setTimeout(() => {
                    $deleteOk.style.opacity = 0;
                }, 1500)
            }, 500);

            window.location.reload();
        };
    })
    .catch(error => alert(`${error.errorMsg}`))
};
