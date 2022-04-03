const express = require('express');
const adminController = require('../controllers/adminController.js');
const router = express.Router();

/* router.get('/', adminController.index); */
router.get('/agregar',adminController.addProduct);
router.get('/editar',adminController.editProduct);

module.exports = router;