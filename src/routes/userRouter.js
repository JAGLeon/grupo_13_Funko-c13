const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multer/upRegisterImg');
const validateRegister = require('../validations/registerValidator');
const validateLogin = require('../validations/loginValidator');
const userInSession = require('../middlewares/user/userInSession');

router.get('/inicio', userInSession, userController.login);
router.post('/inicio', validateLogin, userController.loginUser);
router.get('/registro', userInSession, userController.register);
router.post('/registro', uploadFile.single('avatar'), validateRegister, userController.registrarUser);
router.get('/perfil', userInSession, userController.perfil);
router.get('/salir', userController.logout);

module.exports = router;