const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/inicio', userController.login);
router.get('/registro', userController.register);
router.post('/registro', userController.registrarUser);
router.get('/perfil', userController.perfil);

module.exports = router;