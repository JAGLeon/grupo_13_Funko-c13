const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/', homeController.home);
router.get('/detalle-del-producto', homeController.detailProduct);
router.get('/carrito', homeController.compra);

module.exports = router;