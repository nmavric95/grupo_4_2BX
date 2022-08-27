//BASE DE DATOS RELACIONAL
const db = require("../../database/models");
const { sequelize } = require("../../database/models");
const Activities = db.Activity;
const Sports = db.Sport;
const Locations = db.Location;

//Controlados Api
const packageApiController = {
    list : (req, res) => {
        Activities.findAll({
            include : [
                {association : "Location"},
                {association : "Sport"}
            ]
        })
        .then(dataBasePackages => {
            res.status(200).json({
                meta : {
                    total : dataBasePackages.length,
                    link : "/api/package",
                },
                data : dataBasePackages,
            })
        })
        .catch(error => res.send(error))
    },

    detail : (req, res) => {
        let id = req.params.idPackages;
        Activities.findByPk(id, {
            include : [
                {association : "Location"},
                {association : "Sport"}
            ]
        })
            .then(packageToDetail => {
                res.status(200).json({
                    meta : {
                        link : "/api/package/" + id
                    },
                    data : packageToDetail
                })
            })
            .catch(error => res.send(error))
    },
    

    delete: (req, res) => {
        let id = req.params.idPackages
        Activities.destroy({
            where: { id: id}
        })
        .then(() => res.status(200).json())
        .catch(error => res.send(error))
    },

    search: (req, res) =>{
        let criteria = req.params.criteria
        let value = req.params.value

        Activities.findAll({
            where:{
                [criteria]: {value},
            }
        })
        .then( (products) => res.status(200).json({
            meta : {
                link : "/api/package/searchPackages/" + criteria + "/" + value,
                coincidencias : products.length,
            },
            data : products
        }))
        .catch(error => res.send(error))
    },

    categories : (req, res) => {
        
        Activities.findAll({
            include : [{association : "Sport", attributes:["name"]}],
            attributes: [[sequelize.literal("Sport.name"), "Deporte"], [sequelize.fn("COUNT", sequelize.col("Activity.id")), "Count"]],
            group: "Sport.name",
            })
        .then(dataBasePackages => {res.status(200).json({
                meta : {
                    total : dataBasePackages.length,
                    link : "/api/package/categories",
                },
                data : dataBasePackages,
            })
        })
        .catch(error => res.send(error))
    },

    locations : (req, res) => {
        
        Activities.findAll({
            include : [{association : "Location", attributes:["province"]}],
            attributes: [[sequelize.literal("Location.province"), "Provincia"], [sequelize.fn("COUNT", sequelize.col("Activity.id")), "Count"]],
            group: "Location.province",
            })
        .then(dataBasePackages => {res.status(200).json({
                meta : {
                    total : dataBasePackages.length,
                    link : "/api/package/locations",
                },
                data : dataBasePackages,
            })
        })
        .catch(error => res.send(error))
    },
    
}

module.exports = packageApiController;