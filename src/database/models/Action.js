module.exports = (sequelize, DataTypes) => {

    let alias = 'Action';

    let cols = {

        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        type: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },

        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,

        },

    };

    let config = {

        tableName: 'actions',
        timestamps: false,
        underscored: true,
    }


    const Action = sequelize.define(alias, cols, config);

    Action.associate = function(models){
        Action.belongsTo(models.User, {
            as: "User",
            foreignKey: "user_id"
        })
    }

    return Action

}
