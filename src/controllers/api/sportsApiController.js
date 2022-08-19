const db = require("../../database/models");
const Sports = db.Sport;


//Controlados Api
const sportsApiController = {
    list : (req, res) => {
        Sports.findAll()
        .then(sports => {
            res.status(200).json({
                meta : {
                    total : sports.length,
                    link : "/api/sports",
                },
                data : sports,
            })
        })
        .catch(error => res.send(error))
    },

}

module.exports = sportsApiController;