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
            type: DataTypes.VARCHAR(45),
            allowNull: false,
        },

    };

    let config = {

        tableName: 'actions',
        timestamps: false,
        underscored: true,
    }


    const Action = sequelize.define(alias, cols, config);

    return Action

}
