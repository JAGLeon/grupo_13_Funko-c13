const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const adminCategoryController = require('../controllers/admin/adminCategoryController');


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
router.delete('/productos/eliminar/:id', adminProductsController.deleteProduct);


/* CRUD FRANQUICIAS */

/* GET - Lista de franquicias */
router.get('/franquicias', adminCategoryController.list);
/* GET - Agregar franquicia */
router.get('/franquicias/agregar',adminCategoryController.addCategory);
/* POST - Crea un franquicia en la DB */
router.post('/franquicias', adminCategoryController.createCategory);
/* GET - Editar franquicia */
router.get('/franquicias/editar/:id', adminCategoryController.editCategory);
/* PUT - Actualiza franquicia en la DB */
router.put('/franquicias/:id', adminCategoryController.updateCategory);
/* DELETE - Elimina un franquicia */
router.delete('/franquicias/eliminar/:id', adminCategoryController.deleteCategory);

module.exports = router;