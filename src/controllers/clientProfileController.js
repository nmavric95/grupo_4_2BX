const path = require("path")
const { validationResult } = require('express-validator');
const pathDB = path.resolve("./data/userDB.json")


// DB SEQUELIZE
const db = require("../database/models");
const Users = db.User;
const Actions = db.Action;


// PERFIL CLIENTE 
const clientProfileController = {

    clientProfile: (req, res) => {

        let id = req.params.id
        let promUser = Users.findByPk(id)
        let action = Actions.findAll();
        Promise
        .all([promUser, action])
        .then(([userToDetail, allActions]) => {
            return res.render("./user/clientProfile", {userToDetail, allActions})}) 
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
        //     };}

            // CODIGO NUEVO DB
    update:  (req,res) => {
            let id = req.params.id;
            let resultValidation = validationResult(req);
            let userToEdit = Users.findByPk(id);            

            if(!resultValidation.isEmpty()) {
                let userToDetail = {
                    id : id,
                    name: req.body.name,
                    last_name: req.body.lastName,
                    birth_date: req.body.birthDate,
                    email: req.body.email,
                    image : req.body.image ? req.body.image : userToEdit.image,
                    weight: req.body.weight,
                    height: req.body.height,
                    tellus: req.body.tellus,
                };
                res.render("./user/clientProfile", {
                    userToDetail : userToDetail,
                    errors : resultValidation.mapped(),
                })  
            }else{
                
                let image;
                if(req.files[0] != undefined){
                    image = req.files[0].filename;
                }else{
                    image = userToEdit.image;
                }
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
                       },
                        {
                            where: {id: id}
                        }
                        )
                    .then(()=> {
                        return res.redirect(("/userClient/" + id))})            
                    .catch(error => res.send(error))
            }

            
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