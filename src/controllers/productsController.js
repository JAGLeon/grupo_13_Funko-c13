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
        let producto = getProducts.find( producto => producto.id == req.params.id);
        let category = getCategories.find( category => category.id == producto.category);
        res.render('productDetail', {
            producto,
            category,
            title: 'Funko | Detalles',
            stylesheet: 'productDetail.css',
            session: req.session
        })
    }
}


module.exports = productsController