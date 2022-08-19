// DB SEQUELIZE
const db = require("../../database/models");
const Locations = db.Location;


//Controlados Api
const locationsApiController = {
    list : (req, res) => {
        Locations.findAll()
        .then(locations => {
            res.status(200).json({
                meta : {
                    total : locations.length,
                    link : "/api/locations",
                },
                data : locations,
            })
        })
        .catch(error => res.send(error))
    },

}

module.exports = locationsApiController;