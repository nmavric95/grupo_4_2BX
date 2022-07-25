const path = require("path")
const fs = require("fs");
const { validationResult } = require('express-validator');
const { body } = require("express-validator");
const pathDB = path.resolve("./data/userDB.json")


// DB SEQUELIZE
const db = require("../database/models");
const Users = db.User;
const Actions = db.Action;


const userDB = JSON.parse(fs.readFileSync(pathDB, "utf-8"))


// PERFIL CLIENTE 
const clientProfileController = {

    clientProfile: (req, res) => {
    let id = req.params.id
    let userToDetail = userDB.find(user => user.id == id);
    res.render("./user/clientProfile", {userToDetail: userToDetail}) 
    },

    edit: (req, res) => {

        let idUser = req.params.id;
        let userID = Users.findByPk(idUser)
        let action = Actions.findAll();
        Promise
        .all([userID, action])
        .then(([User, Action]) => {
            return res.render(("./user/clientProfile"), {User,Action})}) 
        .catch(error => res.send(error))
    },


        // let resultValidation = validationResult(req);

        // if(!resultValidation.isEmpty()) {
        //     let id = req.params.id
        //     let userToDetail = {
        //         id : id,
        //         ...req.body
        //     };
        //     res.render("./user/clientProfile", {
        //         userToDetail : userToDetail,
        //         errors : resultValidation.mapped(),
        //     })
            
        // }else{
        //     let id = req.params.id;
        //     let userToEdit = userDB.find(user => user.id == id);

        //     let image;
        //     if(req.files[0] != undefined){
        //         image = req.files[0].filename;
        //     }else{
        //         image = userToEdit.image;
        //     };}},

            // CODIGO NUEVO DB
    update: function (req,res) {
                let idUser = req.params.id;
                Users
                .update(
                    {
                        name: req.body.name,
                        last_name: req.body.lastName,
                        birth_date: req.body.birthDate,
                        email: req.body.email,
                        image : image,
                        weight: req.body.weight,
                        height: req.body.height,
                        tellus: req.body.tellus,
                        admin: req.body.admin,


                    },
                    {
                        where: {id: idUser}
                    })
                .then(()=> {
                    return res.redirect(("/userClient/" + userEdited.id))})            
                .catch(error => res.send(error))
            },

        //     let userEdited = {
        //         id : userToEdit.id,
        //         ...req.body,
        //         image : image,
        //     };

        //     let dataBaseUsersEdited = userDB.map(user => {
        //         if(user.id == userEdited.id){
        //             return user = {...userEdited}
        //         }
        //         return user;
        //     });

        //     fs.writeFileSync(pathDB, JSON.stringify(dataBaseUsersEdited, null, " "));

        //     res.redirect(("/userClient/" + userEdited.id));
        // }   
   
    logout: (req, res) => {
        res.clearCookie("userEmail")
        req.session.destroy()
        return res.redirect("/")

    },
}

module.exports = clientProfileController;