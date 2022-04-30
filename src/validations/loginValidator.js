const { check, body } = require('express-validator');
const {getUsers} = require('../data');
const bcrypt = require('bcryptjs');

let validateLogin = [
    check("email")
        .notEmpty().withMessage("El email es requerido").bail()
        .isEmail().withMessage("Ingrese un email válido"),
    body("custom").custom((value, { req })=>{
        let user = getUsers.find(user => user.email === req.body.email);
        if(bcrypt.compareSync(req.body.password, user.password)){
            return true;
        }
        return false;
    }).withMessage("Email o contraseña incorrecto"),
    check("password")
        .notEmpty().withMessage("Ingrese una contraseña"),
];

module.exports = validateLogin;