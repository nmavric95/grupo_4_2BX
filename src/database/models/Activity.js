module.exports = (sequelize, DataTypes) => {
    let alias = "Activity";

    let cols = {
        id : {
            type : DataTypes.INTEGER(11),
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
        },
        location_id : {
            type : DataTypes.INTEGER(11),
            allowNull : false,
        },
        sport_id : {
            type : DataTypes.INTEGER(11),
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        startTime : {
            type : DataTypes.TIME,
            allowNull : false,
        },
        endTime : {
            type : DataTypes.TIME,
            allowNull : false,
        },
        image : {
            type : DataTypes.STRING(200),
            allowNull : false,
        },
        description : {
            type : DataTypes.STRING(500),
            allowNull : false,
        },
        discount : {
            type : DataTypes.INTEGER(11),
            allowNull : true,
        },
        saleRatio : {
            type : DataTypes.TINYINT(4),
            allowNull : false,
        },
        reservationPrice : {
            type : DataTypes.INTEGER(11),
            allowNull : true,
        },
        price : {
            type : DataTypes.INTEGER(11),
            allowNull : true,
        },
        lunch : {
            type : DataTypes.TINYINT(4),
            allowNull : false,
        },
        snack : {
            type : DataTypes.TINYINT(4),
            allowNull : false,
        },
        transport : {
            type : DataTypes.TINYINT(4),
            allowNull : false,
        },
        experienceLevel : {
            type : DataTypes.INTEGER(11),
            allowNull : true,
        },
        description : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        
    };
    
    let config = {
        tableName : "activities",
        timestamps : false,
        underscored : true,
    };

    const Activity = sequelize.define(alias, cols, config);

    Activity.associate = function(models){
        Activity.belongsTo(models.Sport, {
            as: "Sport",
            foreignKey: "sport_id"
        })
    }

    Activity.associate = function(models){
        Activity.belongsTo(models.Location, {
            as: "Location",
            foreignKey: "location_id"
        })
    }

    return Activity
};