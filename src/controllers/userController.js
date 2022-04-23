const{getUsers,writeUsers} = require('../data')
const { validationResult } = require('express-validator');

let  countries = ['Argentina','Bolivia', 'Chile','Colombia','Ecuador', 'Paraguay', 'Perú' , 'Uruguay' ];


module.exports = {
    login: (req,res) => {
        res.render('login',{
            title : 'Funko | Inicio',
            stylesheet: 'forms.css'
        });
    },
    register:(req,res)=>{
        res.render('register',{
            title : 'Funko | Registro',
            stylesheet: 'forms.css',
            countries
        });
    },
    registrarUser : (req,res)=>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let lastId = 0;
            getUsers.forEach(user => {
                if (user.id > lastId) {
                    lastId = user.id
                };
            });
    
            let newUser = {
                id : lastId + 1,
                ...req.body,
                avatar : req.file ? req.file.filename : "user.jpg"
            }
    
            getUsers.push(newUser);
            writeUsers(getUsers);
            res.redirect('/usuarios/inicio');
        }else{
            res.render('register',{
                title : 'Funko | Registro',
                stylesheet: 'forms.css',
                countries,          
                errors : errors.mapped(),
                oldData: req.body
            });
        }
        
    },
    perfil : (req,res)=>{
        res.render('editUser',{
            title : 'Funko | Perfil',
            stylesheet : 'perfil.css'
        })
    }
}