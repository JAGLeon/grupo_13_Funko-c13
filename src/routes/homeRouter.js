const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();
const userSession = require('../middlewares/user/userSession');

router.get('/', homeController.home);
router.get('/search', homeController.search);
router.get('/carrito'/* , userSession */, homeController.compra);


module.exports = router;
