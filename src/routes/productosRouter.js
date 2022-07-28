const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productsController');
const userSession = require('../middlewares/user/userSession');

router.get('/', productosController.listar);
router.get('/detalle/:id', productosController.detailProduct);
router.get('/ofertas', productosController.ofertas);
router.get('/carrito', userSession, productosController.compra);


module.exports = router;