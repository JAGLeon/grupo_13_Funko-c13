const db = require("../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


let productsController = {
    listar : (req, res) => {
        db.Product.findAll({
            include : [{association : 'images'}],
            order : [['name', 'ASC']]
        })
        .then((productos) => {
            db.Category.findAll()
            .then(categorias => {
                res.render('productos', {
                    title: 'Funko | Listado',
                    stylesheet: 'products.css',
                    productos,
                    session: req.session,
                    toThousand,
                    categorias
                });
            })
            .catch(error => res.send(error));
        })
        .catch((error) => {res.send(error)});
    },   
    detailProduct : (req, res) => {
        let idProduct = req.params.id
        db.Product.findByPk(idProduct)
        .then(producto => {
            db.ProductImage.findOne({where : {product_id : idProduct}})
            .then(img => {
                db.Category.findAll()
                .then(categorias => {
                    res.render('productDetail', {
                        producto,
                        image : img.image,
                        title: 'Funko | Detalles',
                        stylesheet: 'productDetail.css',
                        session: req.session,
                        toThousand,
                        categorias
                    });
                })
                .catch(error => res.send(error));
            })
        })
    },
    ofertas: (req, res) => {
        db.Product.findAll({include : [{association : 'images'}]})
        .then((products) => {
            db.Category.findAll()
            .then(categorias => {
                let productos = products.filter( product => product.discount > 0 )
                    res.render('ofertas', {
                        title: 'Funko | Ofertas',
                        stylesheet: 'products.css',
                        productos: productos,
                        session: req.session,
                        toThousand,
                        categorias
                    });
                })
                .catch(error => res.send(error));
            })
        .catch((error) => {res.send(error)});
    }
}


module.exports = productsController