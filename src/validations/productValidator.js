const { check, body } = require('express-validator');

let validateProduct = [
    check("name")
        .notEmpty().withMessage("El nombre es requerido").bail()
        .isString().withMessage("Ingresa un nombre válido").bail()
        .isLength({min: 5}).withMessage("El nombre debe tener al menos 5 caracteres"),
    check("price")
        .notEmpty().withMessage("Ingresa un precio").bail()
        .isNumeric().withMessage("Sólo números"),     
    check("category")
        .notEmpty().withMessage("Selecciona una franquicia"),
    check("description")
        .notEmpty().withMessage("Ingresa una descripción"),
    body("discount").custom(value => {
            if(value >= 0 && value <= 100){
                return true;
            }
            return false;
        }).withMessage("El descuento debe tener un valor entre 0 y 100"), 
    body("cuotes").custom(value => {
            if(value >= 0 && value <= 12){
                return true;
            }
            return false;
        }).withMessage("Las cuotas deben tener un valor entre 0 y 12"), 
    body("images")
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

module.exports = validateProduct;