const db = require('../database/models');

module.exports = {
    politicaPrivacidad: (req,res)=>{
        db.Category.findAll()
        .then(categorias => {
            res.render('politicas',{
                title : 'Funko | Politica',
                stylesheet: 'politica.css',
                session: req.session,
                categorias
            });
        })
        .catch(error => res.send(error));
    },
    formasDePago: (req,res)=>{
        db.Category.findAll()
        .then(categorias => {
            res.render('formasDePago',{
                title : 'Funko | Pagos',
                stylesheet: 'pagos.css',
                session: req.session,
                categorias
            })
        })
        .catch(error => res.send(error));
    }
}