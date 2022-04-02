module.exports = {
    home: (req,res)=>{
        res.render('home',{
            title : 'Funko',
            stylesheet: 'home.css'
        })
    },
    detailProduct: (req,res)=>{
        res.render('productDetail',{
            title : 'Funko | Detalles',
            stylesheet: 'productDetail.css'
        })
    },
    compra:(req,res)=>{
        res.render('carrito',{
            title : 'Funko | Compras',
            stylesheet: 'carrito.css'
        })
    }
}