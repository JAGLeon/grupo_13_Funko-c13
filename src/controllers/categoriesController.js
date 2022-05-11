let {getProducts, getCategories} = require('../data')

module.exports = {
    categorias: (req, res) => {
        res.render('categories', {
            getCategories,
            title : 'Funko || Categorias',
            stylesheet: 'home.css'
        })
    },
    categoria : (req, res) => {
        let id_category = req.params.IDcategories
        let category = getCategories.find(category => category.id == id_category)
        
        let productos = getProducts.filter( productos => productos.category == id_category)
        res.render('category',{
            category,
            productos,
            title : 'Funko || Categoria',
            stylesheet: 'home.css'
        })
    }
}