let express = require('express');
let router = express.Router();
let orderController = require('../../controllers/apiController/orderController');

/* AGREGA UNO EN EL CARRITO */
router.post('/carrito/:producto/:cantidad/:usuario', orderController.addToCart);
/* MOSTRAR PRODUCTOS EN EL CARRITO */
router.get('/carrito/:usuario', orderController.productsInCart);
/* DISMINUYE LA CANTIDAD UN PRODUCTO DEL CARRITO */
router.delete('/carrito/eliminarUno/:productoCarrito/:usuario', orderController.removeOneFromCart);
/* QUITA EL PRODUCTO DEL CARRITO*/
router.delete('/carrito/eliminarTodo/:productoCarrito/:usuario', orderController.removeAllFromCart);
/* QUITA TODO DEL CARRITO */
router.delete('/carrito/limpiarCarrito/:usuario', orderController.clearCart);
/* POR EL MOMENTO FINJE LA COMPRA */
router.delete('/carrito/comprar/:orden/:usuario', orderController.buyCart);

module.exports = router;
