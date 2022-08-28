//BASE DE DATOS RELACIONAL

const db = require("../database/models");
const Activities = db.Activity;
const Locations = db.Location;
const Sports = db.Sport;

//CONTROLLER PARA PRODUCT DETAIL
const packageController = {
    
    packages : (req,res) =>{
        let promActivities = Activities.findAll({
                include : [
                    {association : "Location"},
                    {association : "Sport"}
                ]
            })
        let promLocations = Locations.findAll();
        let promSports =Sports.findAll();

        Promise.all([promActivities, promLocations, promSports])
            .then(([dataBasePackages, allLocations, allSports]) => {
                res.render("./packages/packages", {dataBasePackages, allLocations, allSports})
            })
            .catch(error => res.send(error));
        
    },

    packagesDetail : (req, res) => {
        let id = req.params.idPackages;

        let packageToRender = Activities.findByPk(id, {
                include: [{association: "Location"}, {association: "Sport"}]
            })

        let allActivities = Activities.findAll({
                include: [{association: "Location"}, {association: "Sport"}]
            })

        Promise.all([packageToRender, allActivities])
        .then(([packageToDetail, allActivities]) => {
              res.render("./packagesDetail/packagesDetail", {packageToDetail, allActivities})
        })
        .catch(error => res.send(error))

    },

    filter : (req, res) => {

        let adrenaline = req.body.adrenalineLevel
        let sport = req.body.sport
        let location = req.body.location
        let price = req.body.price
        let sale = req.body.sale

        let promActivities =  Activities.findAll({
            include : [
                {association : "Location"},
                {association : "Sport"}
            ]})

        let promLocations = Locations.findAll();
        let promSports =Sports.findAll();

       
        Promise.all([promActivities, promLocations, promSports])
            .then(([dataBasePackagesUnfiltered, allLocations, allSports]) => {
                
                let dataBasePackages
        
                if(sport !== undefined){
                    dataBasePackages = dataBasePackagesUnfiltered.filter(package => {
                        return package.dataValues.sport_id == sport
                   })
                }

                if(location !== undefined){
                    if(dataBasePackages){
                        dataBasePackages = dataBasePackages.filter(package => {
                            return package.dataValues.location_id == location
                       })
                    }else{
                        dataBasePackages = dataBasePackagesUnfiltered.filter(package => {
                            return package.dataValues.location_id == location
                       })
                    }  
                }

                if(price !== ""){
                    if(dataBasePackages){
                        dataBasePackages = dataBasePackages.filter(package => {
                            return package.dataValues.price <= price
                       })
                    }else{
                        dataBasePackages = dataBasePackagesUnfiltered.filter(package => {
                            return package.dataValues.price <= price
                       })
                    }  
                }

                if(sale !== undefined){
                    if(dataBasePackages){
                        dataBasePackages = dataBasePackages.filter(package => {
                            return package.dataValues.sale_ratio != 0
                       })
                    }else{
                        dataBasePackages = dataBasePackagesUnfiltered.filter(package => {
                            return package.dataValues.sale_ratio != 0
                       })
                    }  
                }

                if(adrenaline !== undefined){
                    if(dataBasePackages){
                        dataBasePackages = dataBasePackages.filter(package => {
                            return package.dataValues.Sport.dataValues.adrenaline_level == adrenaline
                       })
                    }else{
                        dataBasePackages = dataBasePackagesUnfiltered.filter(package => {
                            return package.dataValues.Sport.dataValues.adrenaline_level == adrenaline
                       })
                    }  
                }

                if(!dataBasePackages){
                    dataBasePackages = dataBasePackagesUnfiltered
                    return dataBasePackages
                }
                
                res.render("./packages/packages", {dataBasePackages, allLocations, allSports})
            })
            .catch(error => res.send(error));
        
    }
};

module.exports = packageController;