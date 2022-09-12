module.exports = (sequelize, DataTypes) => {

    // el alias es el nombre con el cual despues voy a hacer referencia a la tabla
    const alias = "Users";

    const cols = {
        idUser: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false  
        },
        nombres: {
            type: DataTypes.string(500),
            allowNull: false 
        },
        apellidos: {
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
        },
        idRol: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,  
            defaultValue: null
        }
        }

    const config = {
        tableName: 'users',
        timestamps: false
    };


    const Users = sequelize.define(alias, cols, config);

    Users.associate = function(models){
        Users.belongsTo(models.Roles, {
            as: 'roles',
            foreignKey: 'IdRol'
        }
            )
    }

    return Users;
}