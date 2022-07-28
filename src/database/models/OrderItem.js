module.exports = (sequelize, dataTypes) => {
    let alias = "OrdersItems";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }, 
        order_id : {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        quantity : {
            type: dataTypes.INTEGER(11),
        },
        product_id : {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }
    let config = {
        tableName: "order_items",
        timestamps: true,
    }

    const OrdersItems = sequelize.define(alias, cols, config);

    OrdersItems.associate = (models) => {
        OrdersItems.belongsTo(models.Orders,{
            as: 'orders',
            foreignKey: 'order_id'
        });

        OrdersItems.belongsTo(models.Product,{
            as: 'products',
            foreignKey: 'product_id',
        });
    };

    return OrdersItems;
}