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
                console.log(img);
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
        let userAddress = db.User.findOne({where : {id : req.session.user.id},include : [{ association: "addresses" }],})
        let allProducts = db.Product.findAll({include : [{association : 'images'}],order : [['name','DESC']]/*,offset:13*/,limit: 10});
        let allCategories = db.Category.findAll();
        let user = req.session.user.id;
        let carritoOrder = db.Orders.findOne({where: {user_id: user},include: [{association: "order_items",include: [{association: "products"}]}]})

        Promise.all([allProducts, allCategories,userAddress,carritoOrder])
        .then(([productos, categorias,userAddress,carritoOrder]) => {
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
                    res.render('carrito',{
                    title : 'Funko | Compras',
                    stylesheet : 'carrito.css',
                    session : req.session,
                    categorias,
                    productos,
                    userAddress,
                    carritoOrder : carritoOrder.id,
                    user : req.session.user?.id || null,
                    toThousand,
                    products : products !== undefined ? products : []
                });
            })    
        })
    }
};

module.exports = productsController