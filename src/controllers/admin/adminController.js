const {getProducts} = require('../../data');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    index: (req,res)=>{
        res.render('admin/adminIndex',{
            title : 'Funko | Admin',
            stylesheet: 'adminIndex.css',
            session: req.session
        })
    },
    search: (req, res) => {
        let searchResult = [];
        getProducts.forEach( product => {
            if(product.name.toLowerCase().includes(req.query.keywords.toLowerCase())){
                searchResult.push(product)
            }
        });

        res.render('search',{
            searchResult,
            keyword: req.query.keywords,
            title: 'Funko | Busqueda',
            stylesheet: 'productDetail.css',
            toThousand,
            session: req.session,
        })
    },
}