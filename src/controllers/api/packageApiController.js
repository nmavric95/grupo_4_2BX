//BASE DE DATOS RELACIONAL
const db = require("../../database/models");
const { Sequelize } = require("../../database/models");
const Activities = db.Activity;
const Sports = db.Sport;

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
        // let packages = await Activities.findAll( {
        //     attributes: ['id', 'name', 'description','genre_id'],
        //     raw: true });

        // let productsByGenre = {}
        // let genres = await db.Genres.findAll();
        // genres.forEach(genre => {
        //     let count = 0;
        //     products.forEach(element => {
        //         if(element.genre_id == genre.id ){
        //             count ++
        //         }   
        //     });
        //     productsByGenre[genre.name] = count
        //     });


        Activities.findAll({
            include : [
                {association : "Location"},
                {association : "Sport"}
            ],
            attributes: [
                "sport_id",
                [Sequelize.fn("COUNT", Sequelize.col("sport_id")), "Cantidad"],
              ],
              group: "sport_id",
        })
        .then(dataBasePackages => {
            let rta = dataBasePackages.map(package => package)

            res.status(200).json({
                meta : {
                    total : dataBasePackages.length,
                    link : "/api/package",
                },
                data : rta,
            })
        })
        .catch(error => res.send(error))
    }
}

module.exports = packageApiController;