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
            type: DataTypes.VARCHAR(100),
            allowNull: false,
        },

        sportType_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        healthInsurance: {
            type: DataTypes.INTEGER(4),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        adrenalineLevel: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        doctorAproval: {
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
        Sport.belongsTo(models.Sporttype, {
            as: "Sporttype",
            foreignKey: "sportType_id"
        })
    }

    Sport.associate = function(models){
        Sport.hasMany(models.Activity, {
            as: "Activity",
            foreignKey: "sport_id"
        })
    }

    return Sport

}
