const { check, body } = require('express-validator');

let validateRegister = [
    check('country')
        .notEmpty().withMessage('Nombre es requerido'),
    check('name')
        .notEmpty().withMessage('Nombre es requerido').bail()
        .isLength({min:2, max:70}).withMessage('Ingrese un nombre valido'),
    check('lastName')
        .notEmpty().withMessage('Apellido es requerido').bail()
        .isLength({min:2, max:70}).withMessage('Ingrese un apellido valido'),
    check('userName')
        .notEmpty().withMessage('Usuario es requerido').bail()
        .isLength({min:2, max:20}).withMessage('Ingrese un usuario valido'),
    check('email')
        .notEmpty().withMessage('El email es requerido').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener 8 caracteres').bail(),
    check('terms')
        .isString('on').withMessage('Debes aceptar terminos y condiciones')
];

module.exports = validateRegister;