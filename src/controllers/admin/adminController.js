const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const db = require('../../database/models');
const { Op } = require("sequelize");

module.exports = {
    index: (req,res)=>{
        res.render('admin/adminIndex',{
            title : 'Funko | Admin',
            stylesheet: 'adminIndex.css',
            session: req.session
        })
    },
    search: (req, res) => {
        db.Product.findAll({
            include:[
                {association: 'category'},
                {association : 'images'}
            ],
            where: {
                name: {
                    [Op.like]: '%' + req.query.keywords + '%'
                }
            }
        })
        .then((productos) => {
            res.render('admin/products/adminSearch',{
                productos,
                keyword: req.query.keywords,
                title: 'Funko | Admin Busqueda',
                stylesheet: 'adminList.css',
                toThousand,
                session: req.session
            })
        })
    },
}