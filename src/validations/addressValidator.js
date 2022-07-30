const { check, body } = require('express-validator');

let addressValidator = [
    check('addressName')
    .notEmpty().withMessage('Ingrese su dirección').bail()
    .isString().withMessage('Ciudad inválido')
    .isLength({min:2, max:20}).withMessage('Ingrese una dirección valida'),
check('city')
    .notEmpty().withMessage('Ingrese su ciudad'),
check('numberAddress')
    .notEmpty().withMessage('Ingrese su número de domicilio').bail()
    .isNumeric().withMessage("Sólo números")
    .isLength({min:2, max:30}).withMessage('Ingrese un número de domicilio valido'),   
check("postal_code")
    .notEmpty().withMessage('Ingrese su codigo postal').bail()
    .isNumeric().withMessage('Codigo postal inválido')
    .isLength({min:2, max:30}).withMessage('Ingrese un codigo postal valido')

]

module.exports = addressValidator;