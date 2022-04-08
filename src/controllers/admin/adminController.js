const {getProducts} = require('../../data')

module.exports = {
    index: (req,res)=>{
        res.render('admin',{
            title : 'Funko | Admin'
        })
    },
}