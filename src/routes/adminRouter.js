const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const userSession = require('../middlewares/user/userSession');
const adminSession = require('../middlewares/user/adminSession');


/* GET - Index */
router.get('/', adminController.index);

/* CRUD PRODUCTOS */

/* GET - Lista de productos */
router.get('/productos', userSession, adminSession, adminProductsController.list);
/* GET - Agregar producto */
router.get('/productos/agregar', userSession, adminSession, adminProductsController.addProduct);
/* POST - Crea un producto en la DB */
router.post('/productos', adminProductsController.createProduct);
/* GET - Editar producto */
router.get('/productos/editar/:id', userSession, adminSession, adminProductsController.editProduct);
/* PUT - Actualiza producto en la DB */
router.put('/productos/:id', adminProductsController.updateProduct);
/* DELETE - Elimina un producto */
router.delete('/productos/eliminar/:id', adminProductsController.deleteProduct);

module.exports = router;