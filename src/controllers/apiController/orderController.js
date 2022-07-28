let db = require("../../database/models");

module.exports = {
    addToCart: (req, res) => {
        let productID = req.params.producto;
        let quantity = req.params.cantidad;
        let userId = req.params.usuario;

        if (userId) {
            db.Orders.findAll({
              where: { user_id : userId },
              include: [{association: "order_items",
               include: [{association: "products"}]
              }]
            })
            .then((result) => {
                if (result.length > 0) {
                    let products = result[0].order_items || null;
                    let item = products?.find((item) => item.product_id === +productID);
                    if (item) {
                      let newQuantity = +quantity + item.quantity;
                      db.OrdersItems.update(
                        {
                          product_id: productID,
                          quantity: newQuantity,
                        },
                        {where: {id: item.id}}
                      )
                        .then((result) => {
                          res.json({
                            status: 200,
                            msg: "Producto actualizado",
                          });
                        })
                        .catch((error) =>
                          res.json({
                            errors: error,
                          })
                        );
                    } else {
                      db.OrdersItems.create({
                        product_id: productID,
                        order_id: result[0].id,
                        quantity: +quantity,
                      })
                        .then((createdProduct) => {
                          res.status(201).json({
                            status: 201,
                            data: createdProduct,
                          });
                        })
                        .catch((error) =>
                          res.json({
                            errors: error,
                          })
                        );
                    }
                }  else {
                    db.Orders.create({user_id : userId})
                      .then(order => {
                        if (order) {
                          db.OrdersItems.create({
                            order_id: order.id,
                            product_id: productID,
                            quantity: +quantity,
                          })
                          .then(order_item => {
                            res.json({
                              meta: {
                                status: 201,
                              },
                              data: order_item,
                            });
                          });
                        }
                      })
                      .catch((error) =>
                        res.json({
                          errors: error,
                        })
                      );
                }
            })
        }
    },
    removeOneFromCart: (req, res) => {
        let itemId = req.params.productoCarrito;
        let user = req.params.usuario;

        db.Orders.findOne({
          where: {user_id: user},
          include: [{
              association: "order_items",
              include: [{ association: "products" }]
            }]
        }).then((order) => {
          let itemToRemove = order.order_items.find((item) => item.product_id === +itemId);

          if (itemToRemove !== undefined) {
            db.OrdersItems.findByPk(itemToRemove.id)
              .then((item) => {
                let newQuantity = +item.quantity - 1;
                if (item.quantity > 1) {
                  db.OrdersItems.update({
                      order_id: item.order_id,
                      product_id: item.product_id,
                      quantity: newQuantity,
                    },
                    {where: {id: item.id}}
                  ).then((result) => {
                    if (result) {
                      res.json({
                        status: 200,
                        msg: "Producto actualizado",
                      });
                    }
                  });
                } else {
                  db.OrdersItems.destroy({where : {id : item.id}})
                    .then((result) =>
                    res.status(200).json({
                      status: 200,
                      msg: "Producto eliminado",
                    })
                    )
                    .catch((error) =>
                    res.json({
                      errors: error,
                    })
                    );
                }
              })
              .catch((error) =>
                res.json({
                  errors: error,
                })
              );
            }
        });
    },
    removeAllFromCart: (req, res) => {
        let itemId = +req.params.productoCarrito;
        let user = req.params.usuario;

        db.Orders.findOne({
          where: {user_id: user},
          include: [
            {
              association: "order_items",
              include: [{association: "products"}]
            },
          ],
        }).then((order) => {
        let itemToRemove = order.order_items.find((item) => item.product_id === +itemId);

          if (itemToRemove !== undefined) {
            db.OrdersItems.destroy({
              where: {id: itemToRemove.id}
            })
                .then((result) =>
                res.json({
                    status: 200,
                    msg: "Producto eliminado",
                })
                )
                .catch((error) =>
                res.json({
                    errors: error,
                })
                );
          }
        });
      },
      clearCart: (req, res) => {
        let user = req.params.usuario;
        db.Orders.findOne({
            where: {user_id: user},
            include: [{
              association: "order_items",
              include: [{association: "products"}]
            }]
        }).then((order) => {
            db.OrdersItems.destroy({
            where: {order_id: order.id}
            })
                .then((result) => {
                db.Order.destroy({where: {id: order.id}})
                .then((finalResult) => {
                        res.json({
                        status: 200,
                        msg: "Carrito eliminado",
                        });
                    });
                })
                .catch((error) =>
                    res.json({
                        errors: error,
                    })
                );
        });
    },
    productsInCart: (req, res) => {
        let user = req.params.usuario;
        
        db.Orders.findOne({
          where: {user_id: user},
          include: [{
                association: "order_items",
                include: [{
                    association: "products",
                    include: [{association: "images"}]
                }]
            }]
        })
          .then((order) => {
          if(order){
              res.json({
                  data: order,
              });
          }else{
              res.json({
                  status: 404,
                  msg: "No hay una orden creada"
              });
          };
          })
          .catch(error => console.log(error))
    }
};