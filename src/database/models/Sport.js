module.exports = (sequelize, DataTypes) => {

    let alias = 'Sport';

    let cols = {

        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        sport_type_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        health_insurance: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        adrenaline_level: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        doctor_aproval: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
        },
        minors: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
        },

    };

    let config = {

        tableName: 'sports',
        timestamps: false,
        underscored: true,
    }


    const Sport = sequelize.define(alias, cols, config);

    Sport.associate = function(models){
        Sport.hasMany(models.Activity, {
            as: "Activity",
            foreignKey: "sport_id"
        })

        Sport.belongsTo(models.Sporttype, {
            as: "Sporttype",
            foreignKey: "sport_type_id"
        })
    }

    return Sport

}
