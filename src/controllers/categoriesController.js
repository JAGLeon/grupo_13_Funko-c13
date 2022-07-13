const db = require('../database/models');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    categorias: (req, res) => {
        db.Category.findAll()
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
    categoria: (req, res) => {
        let idCategory = req.params.id

        db.Category.findAll()
        .then(categorias => {
            db.Product.findAll({
                include : [{association : 'images'}]
            })
            .then(products => {
                let productos = products.filter( product => product.category_id == idCategory )
                    res.render('category', {
                        idCategory,
                        categorias,
                        title : 'Funko | Categorias',
                        stylesheet: 'products.css',
                        session: req.session,
                        productos: productos,
                        toThousand,
                    })

            })
        })
        .catch(error => res.send(error))
    }
}