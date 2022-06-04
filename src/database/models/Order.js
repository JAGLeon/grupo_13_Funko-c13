module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
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

    const Order = sequelize.define(alias, cols, config);

    return Order;
}