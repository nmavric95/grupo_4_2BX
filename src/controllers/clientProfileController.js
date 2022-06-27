const path = require("path")
const fs = require("fs");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { body } = require("express-validator");
const { Console } = require("console");
const pathDB = path.resolve("./data/userDB.json")

const userDB = JSON.parse(fs.readFileSync(pathDB, "utf-8"))


// PERFIL CLIENTE 
const clientProfileController = {

    clientProfile: (req, res) => {
    let id = req.params.id
    let userToDetail = userDB.find(user => user.id == id);
    res.render("./user/clientProfile", {userToDetail: userToDetail}) 
    },

    edit: (req, res) => {
        let id = req.params.id;
        let userToEdit = userDB.find(user => user.id == id);

         let image;
        if(req.files[0] != undefined){
            image = req.files[0].filename;
        }else{
            image = userToEdit.image;
         };

         let userEdited = {
             id : userToEdit.id,
            ...req.body,
            image : image,
         };

        let dataBaseUsersEdited = userDB.map(user => {
            if(user.id == userEdited.id){
                return user = {...userEdited}
            }
            return user;
        });

        fs.writeFileSync(pathDB, JSON.stringify(dataBaseUsersEdited, null, " "));

        res.redirect(("/userClient/" + userEdited.id));

        
     },
     
//     create: (req, res) =>{

//         let datos = {
//             edad: req.body.edad,
//             peso: req.body.peso,
//             altura: req.body.altura,
//             checkok: req.body.checkok,
//             tellus: req.body.tellus,
//         }

//        res.send(datos)
//     },

//     edit: (req, res) =>
// {
//     let idUser = req.params.idUser;
//     res.send(idUser)
// },
}

module.exports = clientProfileController;