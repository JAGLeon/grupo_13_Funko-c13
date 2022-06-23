let {getProducts, getCategories} = require('../data')
const db = require('../database/models');

module.exports = {
    categorias: (req, res) => {
        db.Category.findAll({

        })
        .then(categorias => {
            res.render('categories', {
                categorias,
                title : 'Funko || Categorias',
                stylesheet: 'home.css',
                session: req.session,
            })
        })
        .catch((error) => {res.send(error)}) 
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