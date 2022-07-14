const { check, body } = require('express-validator');
const { is } = require('type-is');
const db = require('../database/models');

let validateRegister = [
    check('province')
        .notEmpty().withMessage('Seleccione su provincia'),
    check('name')
        .notEmpty().withMessage('Ingrese su nombre').bail()
        .isAlpha().withMessage('Nombre inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un nombre valido'),
    check('lastName')
        .notEmpty().withMessage('Ingrese su apellido').bail()
        .isAlpha().withMessage('Apellido inválido')
        .isLength({min:2, max:30}).withMessage('Ingrese un apellido valido'),
    check('userName')
        .notEmpty().withMessage('Ingrese su usuario').bail()
        .isLength({min:4, max:20}).withMessage('Ingrese un usuario de 4 carácteres'),
    check('email')
        .notEmpty().withMessage('Ingrese su email').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    body("email").custom((value) => {
        return db.User.findOne({
            where : {email : value}
        })
        .then(user => { 
            if(user){
                return Promise.reject('Email ya registrado')
            }
        })
    }),
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({min:8,max:20}).withMessage('Mínimo 8 carácteres, debe tener mayúscula, minúscula, número')
        .matches(/^(.*[a-z].*)$/).withMessage('Mínimo 8 carácteres, debe tener mayúscula, minúscula, número')
        .matches(/^(.*[A-Z].*)$/).withMessage('Mínimo 8 carácteres, debe tener mayúscula, minúscula, número')
        .matches(/^(.*\d.*)$/).withMessage('Mínimo 8 carácteres, debe tener mayúscula, minúscula, número'),
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
];

module.exports = validateRegister;