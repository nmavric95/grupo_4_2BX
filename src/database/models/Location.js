module.exports = (sequelize, DataTypes) => {

    let alias = 'Location';

    let cols = {

        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },

        province: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        geoRegion: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

    };

    let config = {

        tableName: 'locations',
        timestamps: false,
        underscored: true,
    }


    const Location = sequelize.define(alias, cols, config);

    Location.associate = function(models){
        Location.hasMany(models.Activity, {
            as: "Activity",
            foreignKey: "location_id"
        })
    }

    return Location

}
