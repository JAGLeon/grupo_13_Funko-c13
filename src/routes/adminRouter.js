const express = require('express');
const adminController = require('../controllers/admin/adminController.js');
const adminProductsController = require('../controllers/admin/adminProductsController');
const router = express.Router();

/* GET - Index */
router.get('/', adminController.index);

/* CRUD PRODUCTOS */

/* GET - Lista de productos */
router.get('/productos', adminProductsController.list);
/* GET - Agregar producto */
router.get('/productos/agregar',adminProductsController.addProduct);
/* POST - Crea un producto en la DB */
router.post('/productos', adminProductsController.createProduct);
/* GET - Editar producto */
router.get('/productos/editar/:id', adminProductsController.editProduct);
/* PUT - Actualiza producto en la DB */
router.put('/productos/:id', adminProductsController.updateProduct);
/* DELETE - Elimina un producto */
router.delete('/productos/eliminar/:id', adminProductsController.DeleteProduct);

module.exports = router;