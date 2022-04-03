module.exports = {
    index: (req,res)=>{
        res.render('admin/index',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css'
        })
    },
    addProduct: (req,res)=>{
        res.render('admin/addProduct',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css'
        })
    },
    editProduct: (req,res)=>{
        res.render('admin/editProduct',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css'
        })
    }
}