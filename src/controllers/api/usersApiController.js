// DB SEQUELIZE
const { Sequelize } = require("../../database/models");
const db = require("../../database/models");
const Users = db.User;
const Op = Sequelize.Op

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
        let id = req.params.idUser;
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
        let id = req.params.idUser
        Users.destroy({
            where: { id: id}
        })
        .then(() => res.status(200).json())
        .catch(error => res.send(error))
    },

    search: (req, res) => {
        let searchName = req.params.userName

        Users.findAll({
            where:{
                name:{[Op.like]: "%" + searchName + "%"}
            }
        })
        .then( (users) => res.status(200).json({
            meta : {
                link : "/api/users/searchUsers/" + searchName,
                coincidencias : users.length,
            },
            data : users
        }))
        .catch(error => res.send(error))

    },
}

module.exports = usersApiController;