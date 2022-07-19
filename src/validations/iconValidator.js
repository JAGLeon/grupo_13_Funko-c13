const { check, body } = require('express-validator');

let validateIcon = [
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
    

module.exports = validateIcon;