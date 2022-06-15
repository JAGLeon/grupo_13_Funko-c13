/* const {getProducts, writeProducts} = require('../../data'); */
const { validationResult } = require('express-validator');
const db = require("../../database/models");

module.exports = {
    /* Envia la vista de listado de productos */
    list: (req, res) => {
        db.Product.findAll({include:[{association: 'category'}]})
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
        db.Category.findAll()
        .then(category => {
            res.render('admin/products/addProduct',{
                    title : 'Funko | Admin',
                    stylesheet: 'formsEditAdd.css',
                    session: req.session,
                    category
            })
        })
    },
    /* Recibe los datos del form de creación y guarda el producto en la DB */
    createProduct: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()){
            db.Product.create({
                ...req.body,
                category_id : req.body.category,
                stock: req.body.stock ? true : false,
            })
            .then( product => {
                console.log('pase por aca');
                console.log(req.files);
                if (req.files.length > 0) {
                    let arrayImages = req.files.map(image => {
                        return {
                            imageName : image.filename,
                            product_id: product.id
                        }
                    })
                    console.log('AAAAAA ESTUVE AKI!');
                    db.ProductImage.bulkCreate(arrayImages)
                    .then (() =>  res.redirect('/admin/productos'))
                    .catch((error) => res.send(error))
                } else {
                    res.redirect('/admin/productos')
                }
            })
            .catch(error => res.send('errror acaa!'))
        }else{
            db.Category.findAll()
            .then(category => {
                res.render('admin/products/addProduct',{
                        title : 'Funko | Admin',
                        stylesheet: 'formsEditAdd.css',
                        session: req.session,
                        category,
                        old: req.body
                })
            })
        }   
    },
    editProduct: (req,res)=>{
        /* 1 - Obtener el id del producto */
        let idProduct = +req.params.id;
        /* 2 - Buscar el producto a editar */
        db.Product.findByPk(idProduct)
            .then((producto) => {
                res.render('admin/products/editProduct',{
                    title : 'Funko | Admin',
                    stylesheet: 'formsEditAdd.css',
                    producto,
                    session: req.session
                })
            })
        /* 3 - Mostrar el producto en la vista */
    },
    /* Recibe los datos actualizados del form de edición */
    updateProduct: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.Product.update({
                ...req.body,
                category_id : req.body.category,
                stock: req.body.stock ? true : false,
            },{
                where : {id : req.params.id}
            })
            .then (() => { res.redirect('/admin/productos')})
            .catch((error) => res.send(error))
        } else {
            /* 1 - Obtener el id del producto */
            let idProduct = +req.params.id;
            
            db.Product.findByPk(idProduct)
                .then((product) => {
                    res.render('admin/products/editProduct',{
                        title : 'Funko | Admin',
                        stylesheet: 'formsEditAdd.css',
                        producto,
                        session: req.session
                    })
                })
                .catch((error) => res.send(error));
        }
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
