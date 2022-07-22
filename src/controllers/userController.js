const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require("../database/models");

let  provinces = ["Buenos Aires", "Capital Federal", "Catamarca", "Chaco", "Chubut", "Cordoba", "Corrientes", "Entre Rios", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquen", "Rio Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucuman"];

module.exports = {
    login: (req,res) => {
        db.Category.findAll()
        .then(categorias => {
            res.render('users/login',{
                title : 'Funko | Inicio',
                stylesheet: 'forms.css',
                session: req.session,
                categorias
            })
        })
        .catch(error => res.send(error));
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
            db.Category.findAll()
            .then(categorias => {
                res.render('users/login', {
                    title: 'Funko | Inicio',
                    stylesheet: 'forms.css',
                    errors: errors.mapped(),
                    session: req.session,
                    categorias
                })
            })
            .catch(error => res.send(error));
        };
    },
    register:(req,res)=>{
        db.Category.findAll()
        .then(categorias => {
            res.render('users/register',{
                title : 'Funko | Registro',
                stylesheet: 'forms.css',
                provinces,
                session: req.session,
                categorias
            })
        })
        .catch(error => res.send(error));
    },
    registerUser : (req,res)=>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.create({
                ...req.body,
                password : bcrypt.hashSync(req.body.password, 10),
                icon : req.file ? req.file.filename : 'user.jpg',
                rol : 'USER',
            })
            .then(user => {res.redirect('/usuarios/inicio')})
            .catch(error => console.log('Error REGISTER USER'))
        }else{
            db.Category.findAll()
            .then(categorias => {
                res.render('users/register',{
                    title : 'Funko | Registro',
                    stylesheet : 'forms.css',
                    provinces,          
                    errors : errors.mapped(),
                    oldData : req.body,
                    session : req.session,
                    categorias
                })
            })
            .catch(error => res.send(error));
        };
    },
    perfil : (req,res)=>{
        db.User.findOne({
            where : {id : req.session.user.id},
            include : [{ association: "addresses" }],
        })
        .then(user => {
            db.Category.findAll()
            .then(categorias => {
                res.render('users/perfil',{
                    title : `Funko | Perfil ${req.session.user.name}`,
                    stylesheet : 'perfil.css',
                    session: req.session,
                    user,
                    provinces,
                    categorias
                })
            })
            .catch(error => res.send(error));
        })
        .catch(error => console.log('Error PERFIL'))
    },
    /* profileUpdate: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.update({
                ...req.body,
                icon : req.file ? req.file.filename : req.session.user.icon 
            },
            {where : {id: req.session.user.id}})
            .then(() => res.redirect("/usuarios/perfil"))
            .catch(error => res.send(error))
        }else{
            db.User.findOne({
                where: {id: req.session.user.id},
                include: [{ association: "addresses" }],
            })
            .then((user) => {
                db.Category.findAll()
                .then(categorias => {
                    res.render("users/perfil", {
                        title : `Funko | Perfil ${req.session.user.name}`,
                        stylesheet : 'perfil.css',
                        session: req.session,
                        user,
                        provinces,
                        old : req.body,
                        errors: errors.mapped(),
                        categorias
                    })
                })
                .catch(error => res.send(error));
            })
        }
    }, */
    
    imgUpdate: (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.update({
                icon : req.file ? req.file.filename : req.session.user.icon 
            },
            {where : {id: req.session.user.id}})
            .then(() => res.redirect("/usuarios/perfil"))
            .catch(error => res.send(error))
        }else{
            db.User.findOne({
                where: {id: req.session.user.id},
                include: [{ association: "addresses" }],
            })
            .then((user) => {
                db.Category.findAll()
                .then(categorias => {
                    res.render("users/perfil", {
                        title : `Funko | Perfil ${req.session.user.name}`,
                        stylesheet : 'perfil.css',
                        session: req.session,
                        user,
                        provinces,
                        old : req.body,
                        errors: errors.mapped(),
                        categorias
                    })
                })
                .catch(error => res.send(error));
            })
        }
    },
    userNameUpdate: (req,res) =>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.update({
                userName : req.body.userName
            },
            {where : {id: req.session.user.id}})
            .then(() => res.redirect("/usuarios/perfil"))
            .catch(error => res.send(error))
        }else{
            db.User.findOne({
                where: {id: req.session.user.id},
                include: [{ association: "addresses" }],
            })
            .then((user) => {
                db.Category.findAll()
                .then(categorias => {
                    res.render("users/perfil", {
                        title : `Funko | Perfil ${req.session.user.name}`,
                        stylesheet : 'perfil.css',
                        session: req.session,
                        user,
                        provinces,
                        old : req.body,
                        errors: errors.mapped(),
                        categorias
                    })
                })
                .catch(error => res.send(error));
            })
        }
    },
    dataUpdate: (req,res) =>{
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.User.update({
                name : req.body.name,
                lastName : req.body.lastName,
                phone : req.body.phone, 
                province : req.body.province,
            },
            {where : {id: req.session.user.id}})
            .then(() => res.redirect("/usuarios/perfil"))
            .catch(error => res.send(error))
        }else{
            db.User.findOne({
                where: {id: req.session.user.id},
                include: [{ association: "addresses" }],
            })
            .then((user) => {
                db.Category.findAll()
                .then(categorias => {
                    res.render("users/perfil", {
                        title : `Funko | Perfil ${req.session.user.name}`,
                        stylesheet : 'perfil.css',
                        session: req.session,
                        user,
                        provinces,
                        old : req.body,
                        errors: errors.mapped(),
                        categorias
                    })
                })
                .catch(error => res.send(error));
            })
        }
    },   
    addressCreate: (req, res) => {
        db.Address.create({
            ...req.body,
            user_id : req.session.user.id,
        })
        .then(() => res.redirect("/usuarios/perfil"))
        .catch((error) => res.send(error))
    },
    addressDestroy: (req, res) => {
        db.Address.destroy({
            where : {
                id : req.params.id,
            }
        })
        .then(() => {
            res.redirect("/usuarios/perfil")    
        })
        .catch((error) => res.send('Error al eliminar direccion'))
    },
    logout: (req, res) => {
        req.session.destroy();

        if(req.cookies.funko){
            res.cookie('funko', '', { maxAge: -1 });
        };

        res.redirect('/');
    },
    loginGoogle: (req, res) => {
        let user = req.session.passport.user[0]

        req.session.user = {
          id: user.id,
          name: user.name,
          lasName: user.lasName,
          email: user.email,
          googleId: user.social_id,
          userName: user.name,
          rol: user.rol,
          province: " ",
          icon : user.icon,
        }
        res.redirect('/')
    }
};