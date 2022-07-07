const { check, body } = require('express-validator');

let validateProfile = [
    check('userName')
        .notEmpty().withMessage('Ingrese su usuario').bail()
        .isLength({min:2, max:20}).withMessage('Ingrese un usuario valido'),
    check('name')
        .notEmpty().withMessage('Ingrese su nombre').bail()
        .isString().withMessage('Nombre inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un nombre valido'),
    check('lastName')
        .notEmpty().withMessage('Ingrese su apellido').bail()
        .isAlpha().withMessage('Apellido inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un apellido valido'),
    check("province")
        .notEmpty().withMessage('Seleccione una provincia'),    
    check("phone")
        .notEmpty().withMessage('Ingrese su teléfono').bail()
        .isAlpha().withMessage('Teléfono inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un teléfono valido'),
    body('icon')
        .custom((value , {req}) => {
            if(!req.file){
                return true
            } else if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg" || req.file.mimetype === "image/jpg"){
                return true
            } else {
                return false
            }
        }).withMessage('Archivo de imagen en formato (.jpg - .jpeg - .png)')    
    
]
    

module.exports = validateProfile;