// DB SEQUELIZE
const db = require("../../database/models");
const Users = db.User;


//Controlados Api
const usersApiController = {
    list : (req, res) => {
        Users.findAll({
            include : [
                {association : "Action"}
            ]
        })
        .then(users => {
            res.status(200).json({
                meta : {
                    total : users.length,
                    link : "/api/users",
                },
                data : users,
            })
        })
        .catch(error => res.send(error))
    },

    // create : 

    detail : (req, res) => {
        let id = req.params.idPackages;
        Users.findByPk(id, {
            include : [
                {association : "Action"}
            ]
        })
            .then(user => {
                res.status(200).json({
                    meta : {
                        link : "/api/users/" + id
                    },
                    data : user
                })
            })
            .catch(error => res.send(error))
    },
    
    // edit :

    delete: (req, res) => {
        let id = req.params.idPackages
        Users.destroy({
            where: { id: id}
        })
        .then(() => res.status(200).json())
        .catch(error => res.send(error))
    },
}

module.exports = usersApiController;