module.exports = (sequelize, DataTypes) => {

    let alias = 'User';

    let cols = {

        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },

        last_name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },

        birth_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        image: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },

        weight: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: true,
        },

        height: {
            type: DataTypes.DECIMAL(10,0),
            allowNull: true,
        },

        tellus: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },

        admin: {
            type: DataTypes.TINYINT(4),
            allowNull: true,
        },
    };

    let config = {

        tableName: 'users',
        timestamps: false,
        underscored: true,
    }


    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Action, {
            as: "Action",
            foreignKey: "user_id"
        })
    }

    return User
}