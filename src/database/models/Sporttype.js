module.exports = (sequelize, DataTypes) => {

    let alias = 'Sporttype';

    let cols = {

        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
       
    };

    let config = {

        tableName: 'sporttypes',
        timestamps: false,
        underscored: true,
    }


    const Sporttype = sequelize.define(alias, cols, config);

    Sporttype.associate = function(models){
        Sporttype.hasMany(models.Sport, {
            as: "Sport",
            foreignKey: "sport_type_id"
        })
    }

    return Sporttype

}
