//CONTROLLER PARA ADMIN
const path = require("path")
const fs = require("fs")
const pathDB = path.resolve("./data/packageDB.json")

//BASE DE DATOS RELACIONAL
const db = require("../database/models");
const Activities = db.Activity;
const Locations = db.Location;
const Sports = db.Sport;


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
        // let promGeoRegionLocations = Locations.findAll({
        //     attributes : ["geo_region"],
        //     group: "geo_region"
        // });
        let promProvinceLocations = Locations.findAll();
        let promSports = Sports.findAll();

        Promise
            .all([promProvinceLocations, promSports])
            .then(([allProvinceLocations, allSports]) => {
                res.render("./user/adminForm", {allProvinceLocations, allSports})
            })
            .catch(error => res.send(error));
        
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

        let booleanConverter = function(value){
            if (value == undefined){
                value = 0;
            }
            return value;
        }
    
        //CODIGO PARA DB
        let newActivity = {
            //REVISAR, HAY VALORES QUE NO ESTAN EN DATABASE

            location_id : req.body.location,
            sport_id : req.body.sport,
            name : req.body.activityName,
            start_time : req.body.startTime,
            end_time : req.body.endTime,
            image : image,
            description : req.body.description,
            discount : booleanConverter(req.body.sale),
            sale_ratio : booleanConverter(req.body.radio),
            reservation_price : req.body.reservationPrice,
            price : req.body.price,
            lunch : booleanConverter(req.body.lunch),
            snack : booleanConverter(req.body.snack),
            transport : booleanConverter(req.body.transport),
            experience_level : booleanConverter(req.body.experienceLevel),
            description : req.body.description,
        };

        console.log(newActivity)
        
        Activities.create(newActivity)
             .then(res.redirect("/userAdmin/adminBase"));
        
        //CODIGO PARA BASE DE DATOS JSON
        // let newActivity = {
        //     idPackages : dataBasePackages[dataBasePackages.length - 1].idPackages + 1,
        //     ...req.body,
        //     image : image,
        // };
        // dataBasePackages.push(newActivity);
        // fs.writeFileSync(pathDB, JSON.stringify(dataBasePackages, null, " "));
    },
    //VISTA EDITAR PAQUETE
    adminFormEdit : (req, res) => {
        let id = req.params.idPackages

        let promProvinceLocations = Locations.findAll();
        let promSports = Sports.findAll();
        let packageToEdit = Activities.findByPk(id)

        Promise
            .all([promProvinceLocations, promSports, packageToEdit])
            .then(([allProvinceLocations, allSports, packageToEdit]) => {
                res.render("./user/adminFormEdit", {allProvinceLocations, allSports, packageToEdit})
            })
            .catch(error => res.send(error));
        
        //CODIGO PARA BASE DE DATOS JSON
        // let packageToEdit = dataBasePackages.find(package => package.idPackages == id)

        
    },
    //ACTUALIZAR PAQUETE
    adminFormEditSend : (req, res) => {
        let id = req.params.idPackages;
        let packageToEdit = Activities.findByPk(id);


        let image;
        if(req.files[0] != undefined){
            image = req.files[0].filename;
        }else{
            image = packageToEdit.image;
        };

        let packageEdited = {
            id : id,
            location_id : req.body.location,
            sport_id : req.body.sport,
            name : req.body.activityName,
            start_time : req.body.startTime,
            end_time : req.body.endTime,
            image : image,
            description : req.body.description,
            discount : booleanConverter(req.body.sale),
            sale_ratio : booleanConverter(req.body.radio),
            reservation_price : req.body.reservationPrice,
            price : req.body.price,
            lunch : booleanConverter(req.body.lunch),
            snack : booleanConverter(req.body.snack),
            transport : booleanConverter(req.body.transport),
            experience_level : booleanConverter(req.body.experienceLevel),
            description : req.body.description,
        };

        console.log(packageEdited)

        //CODIGO PARA BASE DE DATOS JSON
        //  let dataBasePackagesEdited = dataBasePackages.map(package => {
        //      if(package.idPackages == packageEdited.idPackages){
        //          return package = {...packageEdited}
        //      }
        //      return package;
        //  });

        //  fs.writeFileSync(pathDB, JSON.stringify(dataBasePackagesEdited, null, " "));

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