let {getProducts, getCategories} = require('../data/index')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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
        let searchResult = [];
        getProducts.forEach( product => {
            if(product.name.toLowerCase().includes(req.query.keywords.toLowerCase())){
                searchResult.push(product)
            }
        });

        res.render('search',{
            searchResult,
            keyword: req.query.keywords,
            title: 'Funko | Busqueda',
            stylesheet: 'search.css',
            toThousand,
            session: req.session,
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