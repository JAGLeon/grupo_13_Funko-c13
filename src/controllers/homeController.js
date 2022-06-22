let {getProducts, getCategories} = require('../data/index')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const { Op } = require("sequelize");

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
        db.Product.findAll({
            include : [{association : 'images'}],
            where: {
                name: {
                    [Op.like]: '%' + req.query.keywords + '%'
                }
            }
        })
        .then((productos) => {
            res.render('search',{
                productos,
                keyword: req.query.keywords,
                title: 'Funko | Busqueda',
                stylesheet: 'search.css',
                toThousand,
                session: req.session,
            })
        })
        .catch((error) => {res.send(error)}) 

    },
    compra:(req,res)=>{
        res.render('carrito',{
            title : 'Funko | Compras',
            stylesheet: 'carrito.css',
            session: req.session
        })
    }
}