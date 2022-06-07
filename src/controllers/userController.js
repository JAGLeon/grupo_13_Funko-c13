const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require("../database/models");

let  provinces = ['Argentina','Bolivia', 'Chile','Colombia','Ecuador', 'Paraguay', 'Perú' , 'Uruguay' ];

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
            db.User.findOne({where : {email : req.body.email}})
            .then(user => {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    userName: user.userName,
                    icon: user.icon,
                    email: user.email,
                    rol: user.rol,
                };
    
                if(req.body.recuerdame){
                    const TIME_IN_MILISECONDS = 60000 * 60 * 24 * 365;
                    res.cookie('funko', req.session.user, {
                        expires: new Date(Date.now() + TIME_IN_MILISECONDS),
                        httpOnly: true,
                        secure: true
                    });
                };
    
                res.locals.user = req.session.user;
    
                res.redirect('/');
            })
            .catch(error => console.log('Error USER LOGIN'))

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
            provinces,
            session: req.session
        });
    },
    registerUser : (req,res)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.create({
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
                icon : req.file ? req.file.filename : 'user.jpg',
                rol : 'USER',
            })
            .then(user => {res.redirect('/usuarios/inicio')})
            .catch(error => console.log('Error REGISTER USER'))
        }else{
            res.render('register',{
                title : 'Funko | Registro',
                stylesheet: 'forms.css',
                provinces,          
                errors : errors.mapped(),
                oldData: req.body,
                session: req.session
            });
        };
    },
    perfil : (req,res)=>{

/*         db.User.findOne({
            where: {id : req.session.user.id},
            include: [{ association : 'addresses'}],
        })
        .then(user => {
            res.render('perfil',{
                title : 'Funko | Perfil',
                stylesheet : 'perfil.css',
                session: req.session,
                user,
            });
        })
        .catch(error => console.log('Error PERFIL')) */

    },
    logout: (req, res) => {
        req.session.destroy();

        if(req.cookies.funko){
            res.cookie('funko', '', { maxAge: -1 });
        };

        res.redirect('/');
    }
};