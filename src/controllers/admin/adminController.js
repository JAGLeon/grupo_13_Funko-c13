const {getProducts} = require('../../data')

module.exports = {
    index: (req,res)=>{
        res.render('admin/index',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css'
        })
    },
}