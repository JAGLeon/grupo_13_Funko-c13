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
        .notEmpty().withMessage("Selecciona una categoría"),
    check("description")
        .notEmpty().withMessage("Ingresa una descripción"),
    body("discount").custom(value => {
            if(value >= 0 && value <= 100){
                return true;
            }
            return false;
        }).withMessage("El descuento debe tener un valor entre 0 y 100"), 
    body("images")
        .custom((value , {req}) => {
            if(!req.file){
                    return true
            } else if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg"){
                    return true
            } else {
                    return false
            }
            }).withMessage('Archivo de imagen en formato .png, .jpeg')      
]

module.exports = validateProduct;