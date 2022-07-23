//CONTROLLER PARA ADMIN
const path = require("path")
const fs = require("fs")
const pathDB = path.resolve("./data/packageDB.json")

//BASE DE DATOS RELACIONAL
const db = require("../database/models");
const Activity = db.Activity;


//BASE DE DATOS JSON
const dataBasePackages = JSON.parse(fs.readFileSync(pathDB, "utf-8"))


//CONTROLLERS
const adminControllers = {
    // VISTA ADMIN DE TODOS LOS PAQUETES
    adminBase : (req,res) =>{
        res.render("./user/adminBase", {dataBasePackages: dataBasePackages})
    },
    //VISTA CREAR NUEVO PAQUETE
    adminForm : (req, res) => {
        res.render("./user/adminForm")
    },
    //ALMACENAR NUEVO PAQUETE
    adminFormStore : (req, res) => {
        let defaultImage = "Logo1FondoNegro.jpg";
        let image ;
        if (req.files[0]){
            image = req.files[0].filename;
        }else{
            image = defaultImage;
        };
        //CODIGO PARA BASE DE DATOS JSON
        // let newActivity = {
        //     idPackages : dataBasePackages[dataBasePackages.length - 1].idPackages + 1,
        //     ...req.body,
        //     image : image,
        // };
        // dataBasePackages.push(newActivity);
        // fs.writeFileSync(pathDB, JSON.stringify(dataBasePackages, null, " "));

        //CODIGO PARA DB
        let newActivity = {
            //REVISAR, HAY VALORES QUE NO ESTAN EN DATABASE
            name : req.body.activityName,
            startTime : req.body.startTime,
            endTime : req.body.endTime,
            image : image,
            description : req.body.description,
            discount : req.body.sale,
            saleRatio : req.body.radio,
            reservationPrice : req.body.reservationPrice,
            price : req.body.price,
            lunch : req.body.lunch,
            snack : req.body.snack,
            transport : req.body.transport,
            experienceLevel : req.body.experienceLevel,


        }
        Activity.create(newActivity)
            .then(res.redirect("/userAdmin/adminBase"));
    },
    //VISTA EDITAR PAQUETE
    adminFormEdit : (req, res) => {
        let id = req.params.idPackages
        let packageToEdit = dataBasePackages.find(package => package.idPackages == id)
        res.render("./user/adminFormEdit", {packageToEdit : packageToEdit} );
    },
    //ACTUALIZAR PAQUETE
    adminFormEditSend : (req, res) => {
        let id = req.params.idPackages;
        let packageToEdit = dataBasePackages.find(package => package.idPackages == id);


        let image;
        if(req.files[0] != undefined){
            image = req.files[0].filename;
        }else{
            image = packageToEdit.image;
        };

        let packageEdited = {
            idPackages : packageToEdit.idPackages,
            ...req.body,
            image : image,
        };


         let dataBasePackagesEdited = dataBasePackages.map(package => {
             if(package.idPackages == packageEdited.idPackages){
                 return package = {...packageEdited}
             }
             return package;
         });

         fs.writeFileSync(pathDB, JSON.stringify(dataBasePackagesEdited, null, " "));

         res.redirect("/userAdmin/adminBase");
    },
    //BORRAR PAQUETE
    adminDelete: (req, res) => {
        let idProduct = req.params.idPackages
        let dataBaseModified = dataBasePackages.filter(package => package.idPackages != idProduct)
        fs.writeFileSync(pathDB, JSON.stringify(dataBaseModified, null, " "))
        res.redirect("/userAdmin/adminBase");
    },
}

module.exports = adminControllers;