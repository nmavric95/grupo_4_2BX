//CONTROLLER PARA ADMIN
const path = require("path")
const fs = require("fs")
const pathDB = path.resolve("./data/packageDB.json")

//BASE DE DATOS RELACIONAL
const db = require("../database/models");
const Activities = db.Activity;
const Locations = db.Location;
const Sports = db.Sport;




//CONTROLLERS
const adminControllers = {
    // VISTA ADMIN DE TODOS LOS PAQUETES
    adminBase : (req,res) =>{
        Activities.findAll()
        .then(dataBasePackages => res.render("./user/adminBase", {dataBasePackages}))
        
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

        
        Activities.create(newActivity)
            .then(res.redirect("/userAdmin/adminBase"))
            .catch(error => res.send(error))
    
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

        let booleanConverter = function(value){
            if (value == undefined){
                value = 0;
            }
            return value;
        }

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

        

        Activities.update(packageEdited, {
             where: { id: id}
        }).then(res.redirect("/userAdmin/adminBase"))
        .catch(error => res.send(error))

    },
    //BORRAR PAQUETE
    adminDelete: (req, res) => {
        let id = req.params.idPackages
        Activities.destroy({
            where: { id: id}
        })
        .then(() => res.redirect("/userAdmin/adminBase"))
        .catch(error => res.send(error))
    },
}

module.exports = adminControllers;