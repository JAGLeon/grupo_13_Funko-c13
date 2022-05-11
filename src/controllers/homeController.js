let {getProducts, getCategories} = require('../data/index')

module.exports = {
    home: (req,res)=>{
        res.render('home',{
            title : 'Funko',
            stylesheet: 'home.css',
            categorias: getCategories,
            session: req.session
        })
    },
    search: (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        let productos = getProducts.filter( producto => producto.category == busqueda || producto.name == busqueda)
        res.render('search',{
            title: 'Funko | Busqueda',
            stylesheet: 'home.css',
            session: req.session,
            productos,
            busqueda,
        })
    },
    compra:(req,res)=>{
        res.render('carrito',{
            title : 'Funko | Compras',
            stylesheet: 'carrito.css',
            session: req.session
        })
    }
}