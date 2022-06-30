const { validationResult } = require('express-validator');
const db = require("../../database/models");


module.exports = {
    /* Envia la vista de listado de franquicias */
    list: (req, res) => {
        db.Category.findAll()
        .then((categories) => {
            res.render('admin/categories/listCategories', {
                title: "Listado de franquicias",
                stylesheet: 'adminList.css',
                categories,
                session: req.session,
            })
        })
        .catch((error) => res.send(error));
    },
    /* Envia la vista de formulario de creación de franquicia */
    addCategory: (req,res) => {
        res.render('admin/categories/addCategories',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css',
            session: req.session
        })
    },
    /* Recibe los datos del form de creación y guarda el franquicia en la DB */
    createCategory: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            db.Category.create({
                name: req.body.name,
                image: req.file.filename
            })
            .then(() => res.redirect('/admin/franquicias'))
            .catch((error) => res.send(error));
        } else {
            res.render('admin/categories/addCategories',{
                title : 'Funko | Admin',
                stylesheet: 'formsEditAdd.css',
                session: req.session,
                errors: errors.mapped(),
                old: req.body,
            })
        }

    },
    editCategory: (req,res)=>{
        /* 1 - Obtener el id de la franquicia */
        let idCategory = +req.params.id;
        
        db.Category.findByPk(idCategory)
            .then((category) => {
                res.render('admin/categories/editCategories',{
                    title : 'Funko | Admin',
                    stylesheet: 'formsEditAdd.css',
                    category,
                    session: req.session
                }) 
            })
    },
    /* Recibe los datos actualizados del form de edición */
    updateCategory: (req, res) => {
        /* 1 - Obtener el id de la franquicia */
        let errors = validationResult(req);
        let idCategory = +req.params.id;

        if(errors.isEmpty()){        
            db.Category.update(
                {
                    name: req.body.name,
                    image: req.file.filename
                },
                {
                    where: {id: idCategory,},
                }
            )
                .then((category) => {
                    res.redirect('/admin/franquicias');
                })
                .catch((error) => res.send(error));
        } else {
            db.Category.findByPk(idCategory)
            .then(category => {
                res.render('admin/categories/editCategories',{
                    title : 'Funko | Admin',
                    stylesheet: 'formsEditAdd.css',
                    session: req.session,
                    errors: errors.mapped(),
                    old: req.body,
                    category
                })
            })
        }
    },
    /* Recibe la info del franquicia a eliminar */
    deleteCategory: (req, res) => {
        /* 1 - Obtener el id del franquicia a eliminar */
        let idCategory = +req.params.id;

        db.Category.destroy(
        {
            where: {
                id: idCategory,
            },
        })
            .then((category) => {
                if (category) {
                    res.redirect('/admin/franquicias');
                } else {
                    res.render('not-found');
                }
            })
            .catch((error) => res.send(error));
    },
}
