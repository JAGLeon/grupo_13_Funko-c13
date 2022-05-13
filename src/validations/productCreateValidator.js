const { check, body } = require('express-validator');
/* 
        "name": string
        "price": number,
        "description": string
        "category": string,
        "discount": number,
        "stock": boolean
        cuotes: number,

*/
let validateProduct = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido").bail()
        .isAlphanumeric().withMessage("Ingresa un nombre válido")
        .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres"),
    check("price")
        .notEmpty().withMessage("Ingresa un precio").bail()
        .isNumeric().withMessage("Sólo números"),     
    check("category")
        .notEmpty().withMessage("Selecciona una categoría"),
    check("description")
        .notEmpty().withMessage("Ingresa una descripción").bail(),
    body("discount").custom(value => {
            if(value >= 0 && value <= 100){
                return true;
            }
            return false;
    }).withMessage("El descuento debe tener un valor entre 0 y 100"),      
     
]

module.exports = validateProduct;