const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();
const userSession = require('../middlewares/user/userSession');

router.get('/', homeController.home);
router.get('/detalle-del-producto', homeController.detailProduct);
router.get('/carrito', userSession, homeController.compra);

module.exports = router;