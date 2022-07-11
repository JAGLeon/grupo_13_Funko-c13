/* const {getProducts, writeProducts} = require('../../data'); */
const { validationResult } = require('express-validator');
const db = require("../../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const path = require('path');
const fs = require('fs');


module.exports = {
    /* Envia la vista de listado de productos */
    list: (req, res) => {
        db.Product.findAll({include:[{association: 'category'}]})
        .then((productos) => {
            res.render('admin/products/listProducts', {
                title: "Listado de productos",
                stylesheet: 'adminList.css',
                productos,
                session: req.session,
                toThousand,
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
                let arrayImg = req.files.map(img => {
                    return {
                        image : img.filename,
                        product_id: product.id
                    }
                })
                db.ProductImage.bulkCreate(arrayImg)
                .then (() =>  res.redirect('/admin/productos'))
                .catch((error) => res.send(error))
            })
            .catch(error => res.send(error))
        }else{
            db.Category.findAll()
            .then(category => {
                res.render('admin/products/addProduct',{
                        title : 'Funko | Admin',
                        stylesheet: 'formsEditAdd.css',
                        session: req.session,
                        category,
                        old: req.body,
                        errors : errors.mapped()
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
            db.Category.findAll()
            .then(category => {
                res.render('admin/products/editProduct',{
                        title : 'Funko | Admin',
                        stylesheet: 'formsEditAdd.css',
                        session: req.session,
                        category,
                        producto
                })
            })
        })
/*         db.Product.findByPk(idProduct)
            .then((producto) => {
                res.render('admin/products/editProduct',{
                    title : 'Funko | Admin',
                    stylesheet: 'formsEditAdd.css',
                    producto,
                    session: req.session
                })
            }) */
            .catch((error) => res.send('aca'))
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
            },{ where : {id : req.params.id}})
            .then (() => {



                 if(req.files !== undefined){
                //1 - Preguntar si está subiendo imagenes
                if(req.files.length > 0){
                  //2 - Traer imágenes del project
                  //2 - a. obtener todas las imágenes del proyecto
                  db.ProductImage.findAll({
                    where: {
                      product_id: req.params.id,
                    }
                  })
                  .then((images) => {
                    //2 - b. hacer un array con los nombres de las imagenes.
                    let imageNames = images.map(img => img.image);
                    //3 - Eliminar imagenes del servidor
                    imageNames.forEach(img => {
                      if(fs.existsSync(path.join(__dirname, `../../../public/img/productos/${img}`))){
                        fs.unlinkSync(path.join(__dirname, `../../../public/img/productos/${img}`))
                        console.log('asdsadasdasdasdasdasdasdadasdsadasdas');
                      }else{
                        console.log("-- No se encontró el archivo");
                      }
                    });
                    //4 - Eliminar las imágenes de la tabla
                    db.ProductImage.destroy({
                      where: {
                        product_id: req.params.id,
                      }
                    })
                    .then(() => {
                      //5 - Cargar nuevas imágenes
                       let arrayImg = req.files.map(img => {
                        return {
                            image : img.filename,
                            product_id: req.params.id
                        }
                        })
                        db.ProductImage.bulkCreate(arrayImg)
                        .then (() =>  res.redirect('/admin/productos'))
                        .catch((error) => res.send(error))
                    })
                    .catch(error => console.log(error))
                  })
                  .catch(error => console.log(error))
                }else{
                  res.redirect('/admin/productos')
                }
              }



            //   res.redirect('/admin/productos')
            })
            .catch(error => console.log(error))
        } else {
            /* 1 - Obtener el id del producto */
             let idProduct = +req.params.id;
             
             db.Product.findByPk(idProduct)
                 .then((producto) => {
                     res.render('admin/products/editProduct',{
                         title : 'Funko | Admin',
                         stylesheet: 'formsEditAdd.css',
                         producto,
                         session: req.session
                     })
                 })
                 .catch((error) => res.send('aca'));
        }
        
        /* db.Category.findAll()
        .then(category => {
            res.render('admin/products/addProduct',{
                    title : 'Funko | Admin',
                    stylesheet: 'formsEditAdd.css',
                    session: req.session,
                    category,
                    old: req.body,
                    errors : errors.mapped()
            })
        }) */
    },
    /* Recibe la info del producto a eliminar */
    deleteProduct: (req, res) => {
        let idProducto = +req.params.id;

        db.ProductImage.destroy({where : {product_id : idProducto}})
            .then(() => {
                db.Product.destroy({where : {id : idProducto,}})
                    .then(product => { product ? res.redirect('/admin/productos') : res.render('not-found')})
                    .catch(error => res.send(error))
            })
    },
}
