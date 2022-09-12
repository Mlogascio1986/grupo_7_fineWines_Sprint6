module.exports = (sequelize, DataTypes) => {

// el alias es el nombre con el cual despues voy a hacer referencia a la tabla
    const alias = "roles";

    const cols = {
        idRol: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false  
        },
        rol: {
            type: DataTypes.string(500),
            allowNull: false 
        }
        }

    const config = {
        tableName: 'roles',
        timestamps: false
    };

    const Roles = sequelize.define(alias, cols, config);
    
    Roles.associate = function(models){
        Roles.hasMany(models.Users, {
            as: 'users',
            foreignKey: 'IdUser'
        }
            )
    }
    
    return Roles;
}