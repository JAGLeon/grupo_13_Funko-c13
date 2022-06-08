/* const {getProducts, writeProducts} = require('../../data'); */
const { validationResult } = require('express-validator');
const db = require("../../database/models");

module.exports = {
    /* Envia la vista de listado de productos */
    list: (req, res) => {
        db.Product.findAll()
        .then((productos) => {
            res.render('admin/products/listProducts', {
                title: "Listado de productos",
                stylesheet: 'adminList.css',
                productos,
                session: req.session
            })
        })
        .catch((error)=>{res.send(error)}); 
    },
    /* Envia la vista de formulario de creación de producto */
    addProduct: (req,res)=>{
        res.render('admin/products/addProduct',{
                title : 'Funko | Admin',
                stylesheet: 'formsEditAdd.css',
                session: req.session
        })
    },
    /* Recibe los datos del form de creación y guarda el producto en la DB */
    createProduct: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            db.Product.create({
                name: req.body.name,
            })
                .then ((product) =>{
                  res.redirect('/admin/productos')
             })
                .catch((error) => res.send(error));

        }else{
            res.render('admin/products/addProduct',{
                title : 'Funko | Admin',
                stylesheet: 'formsEditAdd.css',
                session: req.session,
                errors: errors.mapped(),
                old: req.body,
            })
        }   
    },
    editProduct: (req,res)=>{
        /* 1 - Obtener el id del producto */
        let idProduct = +req.params.id;
        /* 2 - Buscar el producto a editar */
        db.Product.findByPk(idProduct)
            .then((product) => {
                res.render('admin/products/editProduct',{
                    title : 'Funko | Admin',
                    stylesheet: 'formsEditAdd.css',
                    product,
                    session: req.session
                })
            })
        /* 3 - Mostrar el producto en la vista */
    },
    /* Recibe los datos actualizados del form de edición */
    updateProduct: (req, res) => {
        /* 1 - Obtener el id del producto */
        let idProduct = +req.params.id;
        
        db.Product.update(
            {
                name: req.body.name,
            },
            {
                where: {
                    id: idProduct,
                },
            }
        )
            .then((product) => {
                if (product) {
                    res.redirect('/admin/productos');
                } else {
                    res.render('not-found');
                }
            })
            .catch((error) => res.send(error));
    },
    /* Recibe la info del producto a eliminar */
    deleteProduct: (req, res) => {
        /* 1 - Obtener el id del franquicia a eliminar */
        let idProducto = +req.params.id;

        db.Product.destroy(
        {
            where: {
                id: idProducto,
            },
        })
            .then((product) => {
                if (product) {
                    res.redirect('/admin/productos');
                } else {
                    res.render('not-found');
                }
            })
            .catch((error) => res.send(error));
    },
}
