module.exports = (sequelize, dataTypes) => {
    let alias = "Orders";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        state : {
            type: dataTypes.STRING(100),
        },
        user_id : {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }
    let config = {
        tableName: "orders",
        timestamps: true,
    }

    const Orders = sequelize.define(alias, cols, config);

    Orders.associate = (models) => {
        Orders.hasMany(models.OrdersItems,{
            as: 'order_items',
            foreignKey: 'order_id',
        });

        Orders.belongsTo(models.User,{
            as: 'users',
            foreignKey: 'user_id',
        });
    };

    return Orders;
}