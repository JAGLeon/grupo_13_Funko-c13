const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminController');
const adminProductsController = require('../controllers/admin/adminProductsController');
const adminCategoryController = require('../controllers/admin/adminCategoryController');
const userSession = require('../middlewares/user/userSession');
const adminSession = require('../middlewares/user/adminSession');
const productCreateValidator = require('../validations/productCreateValidator');
const categoryCreateValidator = require('../validations/categoryCreateValidator');


/* GET - Index */
router.get('/', /* userSession, adminSession, */ adminController.index);
router.get('/search', /* userSession, adminSession, */ adminController.search);

/* CRUD PRODUCTOS */

/* GET - Lista de productos */
router.get('/productos', /* userSession, adminSession, */ adminProductsController.list);
/* GET - Agregar producto */
router.get('/productos/agregar', /* userSession, adminSession, */ adminProductsController.addProduct);
/* POST - Crea un producto en la DB */
router.post('/productos', productCreateValidator ,adminProductsController.createProduct);
/* GET - Editar producto */
router.get('/productos/editar/:id', /* userSession, adminSession, */ adminProductsController.editProduct);
/* PUT - Actualiza producto en la DB */
router.put('/productos/:id', adminProductsController.updateProduct);
/* DELETE - Elimina un producto */
router.delete('/productos/eliminar/:id', adminProductsController.deleteProduct);


/* CRUD FRANQUICIAS */

/* GET - Lista de franquicias */
router.get('/franquicias', /* userSession, adminSession, */ adminCategoryController.list);
/* GET - Agregar franquicia */
router.get('/franquicias/agregar', /* userSession, adminSession, */ adminCategoryController.addCategory);
/* POST - Crea un franquicia en la DB */
router.post('/franquicias', categoryCreateValidator, adminCategoryController.createCategory);
/* GET - Editar franquicia */
router.get('/franquicias/editar/:id', /* userSession, adminSession, */ adminCategoryController.editCategory);
/* PUT - Actualiza franquicia en la DB */
router.put('/franquicias/:id', adminCategoryController.updateCategory);
/* DELETE - Elimina un franquicia */
router.delete('/franquicias/eliminar/:id', adminCategoryController.deleteCategory);

module.exports = router;