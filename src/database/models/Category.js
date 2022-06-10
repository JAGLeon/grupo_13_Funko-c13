module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },        
    };
  
    let config = {
      tableName: "categories",
      timestamps: false,
    };
  
    const Category = sequelize.define(alias, cols, config);

    Category.associate = (models) => {
        Category.hasMany(models.Product,{
            as: 'category',
            foreignKey: 'category_id',
        });
    };

    return Category;
};