const db = require("../database/models");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let axios = require('axios');

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
                    categorias,
                    user: req.session.user?.id || null,
                });
            })
            .catch(error => res.send(error));
        })
        .catch((error) => {res.send(error)});
    },   
    detailProduct : (req, res) => {
        let idProduct = req.params.id
        let productPromise = db.Product.findByPk(idProduct);
        let allProducts = db.Product.findAll({include : [{association : 'images'}],order : [['name', 'ASC']]});

        Promise.all([productPromise, allProducts])
        .then(([producto, productos]) => {
            // res.send(productos)
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
                        user: req.session.user?.id || null,
                        categorias, 
                        productos
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
                        user: req.session.user?.id || null,
                        toThousand,
                        categorias
                    });
                })
                .catch(error => res.send(error));
            })
        .catch((error) => {res.send(error)});
    },
    compra:(req,res)=>{
        let user = req.session.user.id
        axios({
            method: 'get',
            url: `http://localhost:3000/api/carrito/${user}`,
        })
        .then(response =>{
            let products = response.data.data?.order_items.map(item => {
              return {
                ...item.products,
                quantity: item.quantity
              }
            })  
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
                                stylesheet : 'carrito.css',
                                session : req.session,
                                categorias,
                                productos,
                                user : req.session.user?.id || null,
                                toThousand,
                                products : products !== undefined ? products : []
                            });
                        })
                        .catch((error) => {res.send(error)});
                })
                .catch(error => res.send(error));
        })  
        .catch(error => res.send(error));
    }
}


module.exports = productsController