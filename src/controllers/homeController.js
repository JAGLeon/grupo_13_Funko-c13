module.exports = {
    home: (req,res)=>{
        res.render('home',{
            title : 'Funko',
            stylesheet: 'home.css',
            session: req.session
        })
    },
    detailProduct: (req,res)=>{
        res.render('productDetail',{
            title : 'Funko | Detalles',
            stylesheet: 'productDetail.css',
            session: req.session
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