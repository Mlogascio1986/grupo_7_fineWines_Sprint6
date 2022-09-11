module.exports = (sequelize, DataTypes) => {

    const alias = "users";

    const cols = {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false  
        },
        nombres: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        apellido: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        nombreUsuario: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        email: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        fehcaNacimiento: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        email: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        domicilio: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        password: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        image: {
            type: DataTypes.string(500),
            allowNull: true
        }
        }

    const config = {
        tableName: 'users',
        timestamps: false
    };


    const Users = sequelize.define(alias, cols, config);
    return Users;
}