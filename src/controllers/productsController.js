let {getProducts, getCategories} = require('../data')
const db = require("../database/models");

let productsController = {
    listar : (req, res) => {
        db.Product.findAll({
            include : [{association : 'images'}]
        })
        .then((productos) => {
            res.render('productos', {
                title: 'Funko | Listado',
                stylesheet: 'products.css',
                productos,
                session: req.session
            })
        })
        .catch((error) => {res.send(error)}) 
    },   
    detailProduct : (req, res) => {
        let idProduct = req.params.id

        db.Product.findByPk(idProduct)
            .then(producto => {
                db.ProductImage.findOne({where : {product_id : idProduct}})
                    .then(img => {
                        res.render('productDetail', {
                            producto,
                            image : img.image,
                            title: 'Funko | Detalles',
                            stylesheet: 'productDetail.css',
                            session: req.session
                        })
                    })
            })
        /*let producto = getProducts.find( producto => producto.id == req.params.id);
        let category = getCategories.find( category => category.id == producto.category);
        res.render('productDetail', {
            producto,
            category,
            title: 'Funko | Detalles',
            stylesheet: 'productDetail.css',
            session: req.session
        })*/
    },
    ofertas: (req, res) => {
        db.Product.findAll({
            include : [{association : 'images'}]
        })
        .then((products) => {
            let productos = products.filter( product => product.discount > 0 )
                res.render('ofertas', {
                    title: 'Funko | Ofertas',
                    stylesheet: 'products.css',
                    productos: productos,
                    session: req.session
                })
            })
        .catch((error) => {res.send(error)}) 
    }
}


module.exports = productsController