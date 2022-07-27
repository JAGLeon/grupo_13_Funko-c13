const BASE_URL = window.location.origin
function qs(element) {
    return document.querySelector(element);
};

// function radio(x){
//     if(x == 0){
//         qs("sucursal-inputs").classList.remove("none");
//         qs("domicilio-inputs").classList.add("none");
//     } else {
//         qs("domicilio-inputs").classList.remove("none");
//         qs("sucursal-inputs").classList.add("none");
//     }
// }

    
    let $addToCart = qs('#addToCart'),
    $removeOne = qs('#removeOne'),
    $removeAll = qs('#removeAll'),
    $clearCart = qs('#clearCart'),
    $addToCartOk = qs('#addToCartOk');

    function addToCart (productId, quantity = 1, user){
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
                alert('Producto agregado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function removeOne (productId, user){
        fetch(`${BASE_URL}/api/carrito/eliminarUno/${productId}/${user}`, {method: "DELETE"})
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
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function removeAll (productId, user){
        fetch(`${BASE_URL}/api/carrito/eliminarTodo/${productId}/${user}`, {method: "DELETE"})
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
            
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

    function clearCart (user){
        fetch(`${BASE_URL}/api/carrito/limpiarCarrito/${user}`, {method: "DELETE"})
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
            
            if(result.status === 200){
                alert('Producto Eliminado')
                window.location.reload()
            }
        })
        .catch(error => alert(`${error.errorMsg}`))
    }

