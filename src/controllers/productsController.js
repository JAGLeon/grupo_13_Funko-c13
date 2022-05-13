let {getProducts, getCategories} = require('../data')

let productsController = {
    listar: (req, res) => {
        let productos = getProducts;
        let categories = getCategories;
        res.render('productos', {
            productos,
            categories,
            title: 'Funko | Listado',
            stylesheet: 'products.css',
            session: req.session
        })
    },   
    detailProduct : (req, res) => {
        let producto = getProducts.find( producto => producto.id == req.params.id)
        let category = getCategories.find( category => category.id == producto.category)
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