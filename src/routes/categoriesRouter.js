const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();
const userSession = require('../middlewares/user/userSession');

/* GET Sucursal */
router.get('/', categoriesController.categorias)
// router.get('/:IDcategoria', categoriesController.categoria)

module.exports = router;