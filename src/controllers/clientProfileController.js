const path = require("path")
const fs = require("fs");
const req = require("express/lib/request");
const res = require("express/lib/response");
const pathDB = path.resolve("./data/userDB.json")

const userDB = JSON.parse(fs.readFileSync(pathDB, "utf-8"))


// PERFIL CLIENTE 
const clientProfileController = {
    clientProfile: (req, res) => {
        res.render("./user/clientProfile"), ({userDB: userDB})
    },

    create: (req, res) =>{

        let datos = {
            edad: req.body.edad,
            peso: req.body.peso,
            altura: req.body.altura,
            checkok: req.body.checkok,
            tellus: req.body.tellus,
        }

       res.send(datos)
    },

    edit: (req, res) =>
{
    let idUser = req.params.idUser;
    res.send(idUser)
},
}

module.exports = clientProfileController;