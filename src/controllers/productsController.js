let {getProducts, getCategories} = require('../data')

let productsController = {
    listar: (req, res) => {
        res.render('producto', {
            productos : getProducts,
            title: 'Funko | Listado',
            stylesheet: 'productDetail.css',
            session: req.session
        })
    },   
    detailProduct : (req, res) => {
        let producto = getProducts.find( producto => producto.id == req.params.id)
        let category = get.find( category => category.id == producto.category)
        res.render('productDetail', {
            producto,
            category,
            title: 'Funko | Detalles',
            stylesheet: 'productDetail.css',
            session: req.session
        })
    },
    compra:(req,res)=>{
        res.render('carrito',{
            title : 'Funko | Compras',
            stylesheet: 'carrito.css',
            session: req.session
        })
    },
}


module.exports = productsController