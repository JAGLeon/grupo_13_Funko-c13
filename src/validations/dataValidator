const { check, body } = require('express-validator');

let dataValidator = [
    check('name')
        .notEmpty().withMessage('Ingrese su nombre1').bail()
        .isString().withMessage('Nombre inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un nombre valido'),
    check('lastName')
        .notEmpty().withMessage('Ingrese su apellido1').bail()
        .isAlpha().withMessage('Apellido inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un apellido valido'),   
    check("phone")
        .notEmpty().withMessage('Ingrese su teléfono1').bail()
        .isNumeric().withMessage('Teléfono inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un teléfono valido'),   
]
    

module.exports = dataValidator;