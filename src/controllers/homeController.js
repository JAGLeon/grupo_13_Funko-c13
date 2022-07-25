let {getProducts, getCategories} = require('../data/index')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../database/models');
const { Op } = require("sequelize");

module.exports = {
    home: (req,res)=>{
        db.Category.findAll()
        .then(categorias => {
            db.Product.findAll({
                include : [{association : 'images'}],
                order : [['name','ASC']],
                offset: 0,
                limit: 20
            })
            .then(products => {
                let productos = products.filter( product => product.discount == 0 );
                let productosOff = products.filter( product => product.discount > 0 );
                res.render('home',{
                    title : 'Funko',
                    stylesheet: 'home.css',
                    session: req.session,
                    categorias,
                    productos,
                    productosOff,
                    toThousand
                });
            })
            .catch((error) => {res.send(error)});
        })
        .catch((error) => {res.send(error)});
    },
    search: (req, res) => {
        db.Product.findAll({
            include : [{association : 'images'}],
            where: {name: {[Op.like]: '%' + req.query.keywords + '%'}}
        })
        .then((productos) => {
            db.Category.findAll()
            .then(categorias => {
                res.render('search',{
                    productos,
                    keyword: req.query.keywords,
                    title: 'Funko | Busqueda',
                    stylesheet: 'search.css',
                    toThousand,
                    session: req.session,
                    categorias
                });
            })
            .catch(error => res.send(error));
        })
        .catch((error) => {res.send(error)});
    },
    compra:(req,res)=>{
        db.Category.findAll()
        .then(categorias => {
            db.Product.findAll({
                include : [{association : 'images'}],
                order : [['name','DESC']],
                // offset:13,
                limit: 10
            })
            .then(productos => {
                res.render('carrito',{
                    title : 'Funko | Compras',
                    stylesheet: 'carrito.css',
                    session: req.session,
                    categorias,
                    productos,
                    toThousand
                });
            })
            .catch((error) => {res.send(error)});
        })
        .catch(error => res.send(error));
    }
}
