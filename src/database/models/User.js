module.exports = (sequelize, dataTypes) => {
    let alias = "User";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        lastName: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        userName: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        icon: {
            type: dataTypes.STRING(1000),
        },
        rol: {
            type: dataTypes.STRING(20),
            allowNull: false,
        },
        province: {
            type: dataTypes.STRING(300),
            allowNull: false,
        },
        phone: {
            type: dataTypes.STRING(100),
        }
    };

    let config = {
        tableName: "users",
        timestamps: false,
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Order,{
            as: 'orders',
            foreignKey: 'user_id',
        });

        User.hasMany(models.Address,{
            as: 'addresses',
            foreignKey: 'user_id',
        });
    };

    return User;
}