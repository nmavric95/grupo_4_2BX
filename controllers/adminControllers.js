//CONTROLLER PARA ADMIN
const path = require("path")
const fs = require("fs")
const pathDB = path.resolve("./src/data/packageDB.json")

const dataBasePackages = JSON.parse(fs.readFileSync(pathDB, "utf-8"))

const adminControllers = {
    adminForm : (req, res) => {
        res.render("./user/adminForm")
    },
    adminBase : (req,res) =>{
        res.render("./user/adminBase", {dataBasePackages: dataBasePackages})
    },
    adminDelete: (req, res) =>{
        let idProduct = req.params.idPackages
        let dataBaseModified = dataBasePackages.filter(package => package.idPackages != idProduct)
        fs.writeFileSync(pathDB, JSON.stringify(dataBaseModified, null, " "))
        res.redirect("/userAdmin/adminBase")
    }
};

module.exports = adminControllers;