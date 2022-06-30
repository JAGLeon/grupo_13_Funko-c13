const { check, body } = require('express-validator');
/* 
        "name": string
*/
let validateCategory = [
        check("name")
                .notEmpty().withMessage("El nombre es requerido").bail()
                .isAlphanumeric().withMessage("Ingresa un nombre válido")
                .isLength({ min: 5 }).withMessage("El nombre debe tener al menos 5 caracteres"),
        body('image')
                .custom((value, { req }) => {
                        if (!req.file) {
                                return true
                        } else if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg") {
                                return true
                        } else {
                                return false
                        }
                }).withMessage('Archivo de imagen en formato .png, .jpeg')
]

module.exports = validateCategory;