module.exports = {
    home: (req,res)=>{
        res.render('home')
    },
    detailProduct: (req,res)=>{
        res.render('productDetail')
    },
    compra:(req,res)=>{
        res.render('carrito')
    }
}