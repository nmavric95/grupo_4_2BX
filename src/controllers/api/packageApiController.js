//BASE DE DATOS RELACIONAL
const db = require("../../database/models");
const Activities = db.Activity;

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

    // create : 

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
    
    // edit :

    delete: (req, res) => {
        let id = req.params.idPackages
        Activities.destroy({
            where: { id: id}
        })
        .then(() => res.status(200).json())
        .catch(error => res.send(error))
    },
}

module.exports = packageApiController;