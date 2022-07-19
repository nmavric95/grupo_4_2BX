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
            type: DataTypes.VARCHAR(50),
            allowNull: false,
        },
        geoRegion: {
            type: DataTypes.VARCHAR(50),
            allowNull: false,
        },

    };

    let config = {

        tableName: 'locations',
        timestamps: false,
        underscored: true,
    }


    const Location = sequelize.define(alias, cols, config);

    return Location

}
