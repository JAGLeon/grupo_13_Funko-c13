module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        image : {
            type: dataTypes.STRING(70),
            allowNull: false,
        },
        product_id : {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }
    let config = {
        tableName: "products_images",
        timestamps: true,
    }

    const ProductImages = sequelize.define(alias, cols, config);

    
    ProductImages.associate = (models) => {
        ProductImages.belongsTo(models.Product,{
            as: 'product',
            foreignKey: 'product_id'
        });
    };

    return ProductImages;
}