const path = require("path");

//BASE DE DATOS RELACIONAL
const db = require("../database/models");
const Activities = db.Activity;

//CONTROLLER PARA PRODUCT DETAIL
const packageController = {
    
    packages : (req,res) =>{
        Activities.findAll({
            include : [
                {association : "Location"},
                {association : "Sport"}
            ]
        }).then(dataBasePackages => {
            res.render("./packages/packages", {dataBasePackages: dataBasePackages})
        })
        
    },

    packagesDetail : (req, res) => {
        let id = req.params.idPackages;
        // let packageToDetail = dataBasePackages.find(package => package.idPackages == id);
        Activities.findByPk(id, {
            include : [
                {association : "Location"},
                {association : "Sport"}
            ]
        })
            .then(packageToDetail => {
                res.render("./packagesDetail/packagesDetail", {packageToDetail})
            })
        
        // res.render("./packagesDetail/packagesDetail", {packageToDetail : packageToDetail});
    },
};

module.exports = packageController;