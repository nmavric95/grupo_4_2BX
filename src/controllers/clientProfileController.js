const path = require("path")
const fs = require("fs");
const { validationResult } = require('express-validator');
const { body } = require("express-validator");
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
        let resultValidation = validationResult(req);

        if(!resultValidation.isEmpty()) {
            let id = req.params.id
            let userToDetail = {
                id : id,
                ...req.body
            };
            res.render("./user/clientProfile", {
                userToDetail : userToDetail,
                errors : resultValidation.mapped(),
            })
            
        }else{
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
        }   
    },
}

module.exports = clientProfileController;