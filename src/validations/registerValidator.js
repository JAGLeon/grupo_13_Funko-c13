const { check, body } = require('express-validator');
const db = require('../database/models');

let validateRegister = [
    check('province')
        .notEmpty().withMessage('Seleccione su provincia'),
    check('name')
        .notEmpty().withMessage('Ingrese su nombre').bail()
        .isLength({min:2, max:70}).withMessage('Ingrese un nombre valido'),
    check('lastName')
        .notEmpty().withMessage('Ingrese su apellido').bail()
        .isLength({min:2, max:70}).withMessage('Ingrese un apellido valido'),
    check('userName')
        .notEmpty().withMessage('Ingrese su usuario').bail()
        .isLength({min:2, max:20}).withMessage('Ingrese un usuario valido'),
    check('email')
        .notEmpty().withMessage('Ingrese su email').bail()
        .isEmail().withMessage('Ingrese un email valido'),
    body("email").custom((value) => {
        return db.User.findOne({
            where : {
                email : value
            }
        })
        .then(user => { 
            if(user){
                return Promise.reject('Email ya registrado')
            }
        })
    }),
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener 8 caracteres')
    // body('fileProduct').custom((value,{ req })=>{
    //     let file = req.file
    //     let acceptedExtensions = ['.jpg','.png', '.gif'];
        
    //     if (!file) {
    //         throw new Error ('Subir imagen del producto')
    //     } else {       
    //         let filExtensions = path.extname(file.originalname);
    //         if(!acceptedExtensions.includes(filExtensions)){
    //         throw new Error(`Las extenciones de archivo son ${acceptedExtensions.join(', ')}`);
    //         }
    //     }

    //     return true
    // })
];

module.exports = validateRegister;