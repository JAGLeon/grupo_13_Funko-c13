const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadFile = require('../middlewares/multer/upRegisterImg');
const validateRegister = require('../validations/registerValidator');
const validateLogin = require('../validations/loginValidator');
const validateProfile = require('../validations/profileValidator');
const iconValidator = require('../validations/iconValidator');
const userNameValidator =require('../validations/userNameValidator');
const dataValidator = require('../validations/dataValidator');
const userInSession = require('../middlewares/user/userInSession');
const userSession = require('../middlewares/user/userSession');

router.get('/inicio', userInSession, userController.login);
router.post('/inicio', validateLogin, userController.loginUser);
router.get('/registro', userInSession, userController.register);
router.post('/registro', uploadFile.single('icon'), validateRegister, userController.registerUser);
router.get('/perfil', userSession , userController.perfil);
/* router.put('/perfil', uploadFile.single('icon'), iconValidator  ,userController.imgUpdate);
router.put('/perfil', uploadFile.single('icon'), userNameValidator ,userController.userNameUpdate); */
router.put('/perfil', uploadFile.single('icon'), dataValidator ,userController.dataUpdate);
router.post('/direcciones', userSession, userController.addressCreate);
router.delete('/direcciones/:id', userSession, userController.addressDestroy);
router.get('/salir', userController.logout);

module.exports = router;