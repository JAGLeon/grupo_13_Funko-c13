const { check, body } = require('express-validator');
const { getUsers } = require('../data')
let validateRegister = [
    check('country')
        .notEmpty().withMessage('Seleccione su país'),
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
    body("email").custom((value)=>{
        let user = getUsers.find(user => user.email === value);
        if(user){
            return false;
        }
        return true;
    }).withMessage("Email ya registrado"),
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