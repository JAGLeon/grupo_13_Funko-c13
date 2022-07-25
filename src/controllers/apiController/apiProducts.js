const db = require('../../database/models');

module.exports = {
    categories: (req, res) => {
        let idCategory = req.params.category;

        db.Categories.findOne({where: {id: idCategory}})
        .then(result => {
            res.json(result)
        })
        .catch(erroror = console.log(error))
    },
    addCart: (req, res) => {
        let producto = req.params.prod;
        let cantidad = parseInt(req.params.cantidad);

        if(!req.session.user){
            res.json({visitor: true});
        } else {
            db.OrderItem.findOne({
                where: {
                    user_id: req.session.user.id,
                    product_id: product
                }
            })
            .then(result => {
                console.log(result)
                if(result == null) {
                    db.OrderItem.create({
                        user_id: req.session.user.id,
                        product_id: producto,
                        amount : cantidad
                    })
                    .then(result => {
                        res.json(result);
                    })  
                    .catch(error => {
                        res.json(error);
                    })
                } else {
                    db.OrderItem.update({
                        cantidad: result.dataValues.cantidad + cantidad
                    }, {
                        where: {
                            user_id: req.session.user.id,
                            product_id: producto,
                        }
                    })
                    .then(result => {
                        res.json(result)
                    })
                    .catch(error => {
                        res.json(error)
                    })
                }
            })
            .catch(erroror = console.log(error))
        }
    },
    removeCart: (req, res) => {
        let producto = req.params.prod;

        db.OrderItem.destroy({
            where: {
                product_id: producto,
                user_id: req.session.user.id
            }
        })
        .then(result => {
            res.json(result)
        })
        .catch(error => {
            res.json(error)
        })
    },
    cartProducts: (req, res) => {
        db.OrderItem.findAll({
            where: {
                user_id: req.session.user.id
            },
                include: [{association: 'product',
                include: [{association: 'imagenes'}]
            }]
        })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
    },
    cartCantidad: (req, res) => {
        let cantidad = req.params.cant;
        let producto = req.params.prod;

        db.OrderItem.update({
            cantidad: cantidad
        }, {
            where: {
                product_id: producto
            }
        })
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
    }
}