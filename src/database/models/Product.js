module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(50),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER(11),
        },
        category_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        stock: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        cuotes: {
            type: dataTypes.INTEGER(11),
        },
    }
    let config = {
        tableName: "products",
        timestamps: true,
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.OrdersItems,{
            as: 'products',
            foreignKey: 'product_id'
        });

        Product.hasMany(models.ProductImages,{
            as:'product',
            foreignKey: 'product_id',
        });

        Product.hasOne(models.Category,{
            as: 'category',
            foreignKey: 'category_id'
        })
    };

    return Product;
}