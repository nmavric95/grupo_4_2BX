const path = require("path")
const pathDB = path.resolve("./data/packageDB.json")
const fs = require("fs");

const dataBasePackages = JSON.parse(fs.readFileSync(pathDB, "utf-8"))

//CONTROLLER PARA PRODUCT DETAIL
const packageController = {
    
    packages : (req,res) =>{
        res.render("./packages/packages", {dataBasePackages: dataBasePackages})
    },

    packagesDetail : (req, res) => {
        let id = req.params.idPackages;
        let packageToDetail = dataBasePackages.find(package => package.idPackages == id);
        
        res.render("./packagesDetail/packagesDetail", {packageToDetail : packageToDetail});
    },
};

module.exports = packageController;