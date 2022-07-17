const { check, body } = require('express-validator');

let userNameValidator = [
    check('userName')
        .notEmpty().withMessage('Ingrese su usuario').bail()
        .isLength({min:2, max:20}).withMessage('Ingrese un usuario valido'), 
]
    

module.exports = userNameValidator;