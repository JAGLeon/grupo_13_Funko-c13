const { check } = require('express-validator');
/* 
        "name": string
*/
let validateCategory = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido").bail()
        .isAlphanumeric().withMessage("Ingresa un nombre válido")
        .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres")
]

module.exports = validateCategory;