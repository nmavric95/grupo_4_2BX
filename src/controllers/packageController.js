const path = require("path");
const pathDB = path.resolve("./data/packageDB.json");
const fs = require("fs");

//BASE DE DATOS RELACIONAL
const db = require("../database/models");
const Activities = db.Activity;

const dataBasePackages = JSON.parse(fs.readFileSync(pathDB, "utf-8"))

//CONTROLLER PARA PRODUCT DETAIL
const packageController = {
    
    packages : (req,res) =>{
        res.render("./packages/packages", {dataBasePackages: dataBasePackages})
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