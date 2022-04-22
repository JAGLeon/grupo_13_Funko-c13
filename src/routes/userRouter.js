const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multer/upRegisterImg');
const validateRegister = require('../validations/registerValidator');


router.get('/inicio', userController.login);
router.get('/registro', userController.register);
router.post('/registro', uploadFile.single('avatar'), validateRegister, userController.registrarUser);
router.get('/perfil', userController.perfil);

module.exports = router;