module.exports = (sequelize, dataTypes) => {
    let alias = "Images";
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

    const Images = sequelize.define(alias, cols, config);

    return Images;
}