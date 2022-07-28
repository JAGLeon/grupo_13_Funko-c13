const express = require('express');
const homeController = require('../controllers/homeController');
const router = express.Router();

router.get('/', homeController.home);
router.get('/search', homeController.search);
<<<<<<< HEAD
router.get('/carrito'/* , userSession */, homeController.compra);
=======
>>>>>>> 018448adfeb369c8dde40ad0dab8d6fe201abade


module.exports = router;
