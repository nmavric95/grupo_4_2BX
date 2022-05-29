//CONTROLLER PARA ADMIN
const path = require("path")
const fs = require("fs")
const pathDB = path.resolve("./data/packageDB.json")

const dataBasePackages = JSON.parse(fs.readFileSync(pathDB, "utf-8"))

const adminControllers = {
    adminBase : (req,res) =>{
        res.render("./user/adminBase", {dataBasePackages: dataBasePackages})
    },
    adminForm : (req, res) => {
        res.render("./user/adminForm")
    },
    adminFormStore : (req, res) => {
        let defaultImage = "Logo1FondoNegro.jpg";
        let image ;
        if (req.files[0]){
            image = req.files[0].filename;
        }else{
            image = defaultImage;
        };

        let newActivity = {
            idPackages : dataBasePackages[dataBasePackages.length - 1].idPackages + 1,
            ...req.body,
            image : image,
        };

        dataBasePackages.push(newActivity);
        fs.writeFileSync(pathDB, JSON.stringify(dataBasePackages, null, " "));

        res.redirect("/userAdmin/adminBase");
    },
    adminFormEdit : (req, res) => {
        let id = req.params.idPackages
        let packageToEdit = dataBasePackages.find(package => package.idPackages == id)
        res.render("./user/adminFormEdit", {packageToEdit : packageToEdit} );
    },
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
            idPackages : id,
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

    adminDelete: (req, res) => {
        let idProduct = req.params.idPackages
        let dataBaseModified = dataBasePackages.filter(package => package.idPackages != idProduct)
        fs.writeFileSync(pathDB, JSON.stringify(dataBaseModified, null, " "))
        res.redirect("/userAdmin/adminBase");
    },
}

module.exports = adminControllers;