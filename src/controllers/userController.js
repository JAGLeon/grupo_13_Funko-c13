const{getUsers,writeUsers} = require('../data');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

let  countries = ['Argentina','Bolivia', 'Chile','Colombia','Ecuador', 'Paraguay', 'Perú' , 'Uruguay' ];

module.exports = {
    login: (req,res) => {
        res.render('login',{
            title : 'Funko | Inicio',
            stylesheet: 'forms.css',
            session: req.session
        });
    },
    loginUser: (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let user = getUsers.find(user => user.email === req.body.email);

            req.session.usuario = {
                id: user.id,
                name: user.name,
                userName: user.userName,
                avatar: user.avatar,
                email: user.email,
                rol: user.rol
            };

            if(req.body.recuerdame){
                const TIME_IN_MILISECONDS = 60000 * 60 * 24 * 365;
                res.cookie('funko', req.session.usuario, {
                    expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                    httpOnly: true,
                    secure: true
                });
            };

            res.locals.user = req.session.usuario;

            res.redirect('/');
        }else{
            res.render('login', {
                title: 'Funko | Inicio',
                stylesheet: 'forms.css',
                errors: errors.mapped(),
                session: req.session
            });
        };
    },
    register:(req,res)=>{
        res.render('register',{
            title : 'Funko | Registro',
            stylesheet: 'forms.css',
            countries,
            session: req.session
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
                password: bcrypt.hashSync(req.body.password, 10),
                avatar : req.file ? req.file.filename : 'user.jpg',
                rol : 'USER'
            };
    
            getUsers.push(newUser);
            writeUsers(getUsers);
            res.redirect('/usuarios/inicio');
        }else{
            res.render('register',{
                title : 'Funko | Registro',
                stylesheet: 'forms.css',
                countries,          
                errors : errors.mapped(),
                oldData: req.body,
                session: req.session
            });
        };
        
    },
    perfil : (req,res)=>{
        res.render('perfil',{
            title : 'Funko | Perfil',
            stylesheet : 'perfil.css',
            session: req.session
        });
    },
    logout: (req, res) => {
        req.session.destroy();

        if(req.cookies.funko){
            res.cookie('funko', '', { maxAge: -1 });
        };

        res.redirect('/');
    }
};