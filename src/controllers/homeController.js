let {getProducts, getCategories} = require('../data')

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
            productos,
            busqueda,
            title: 'Funko | Busqueda',
            stylesheet: 'home.css',
        })
    }
}