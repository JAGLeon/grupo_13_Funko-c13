const express = require('express');
const router = express.Router();
const adminProductController = require('../controllers/admin/adminProductController');


router.get('/admin/productos/agregar', adminProductController.productAdd);
