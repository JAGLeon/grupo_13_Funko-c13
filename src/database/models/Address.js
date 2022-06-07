module.exports = (sequelize, dataTypes) => {
    let alias = "Address";
    
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        address: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        city: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        neighborhood: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        departament: {
            type: dataTypes.STRING(100),
        },
        postar_code: {
            type: dataTypes.STRING(100),
            allowNull: false,
        },
        doorbell: {
            type: dataTypes.STRING(100),
        },
    };
  
    let config = {
      tableName: "addresses",
      timestamps: false,
    };
  
    const Address = sequelize.define(alias, cols, config);

    Address.associate = (models) => {
        Address.hasMany(models.User,{
            as: 'addresses',
            foreignKey: 'user_id',
        });
    };

    return Address;
};