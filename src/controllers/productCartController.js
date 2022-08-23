//CONTROLLER PARA PRODUCT CART
const path = require("path");
const db = require("../database/models");
const { Sequelize } = require("../database/models")
const Op = Sequelize.Op
const userRoutesMiddleware = require("../middlewares/userRoutesMiddleware");

const Activities = db.Activity;
const Users = db.User;

const productCartController = {
    productCart : (req, res) => {

        let stringIdsPackages = req.cookies.idsPackageCookie

        console.log(stringIdsPackages)

        if(stringIdsPackages) {
            let idsPackages = stringIdsPackages.split(",");
            console.log(idsPackages)
            let toBuy = [];

            
            Activities.findAll({
                    where: {id: {[Op.in]: idsPackages}},
                    
                })
                .then(values => {
                    values.map(value => {
                        toBuy.push(value.dataValues)
                    })
                    
                    res.render("./productCart/productCart", {toBuy})
                })
                .catch(error => res.send(error))
            
        }else{
            let toBuy = [];
            res.render("./productCart/productCart", {toBuy})
        }

    },

    productCartAdd : (req, res) => {
        let id = req.params.idPackages;
        let idsPackagesReqCookie = req.cookies.idsPackageCookie

        if (idsPackagesReqCookie) {
            idsPackagesReqCookie += "," + id

            res.cookie("idsPackageCookie", idsPackagesReqCookie, {maxAge: (1000*60)*5})

            res.redirect("/productCart");

        }else{

            let stringIdsPackages = "";

            stringIdsPackages += id + ","
            
            stringIdsPackages = stringIdsPackages.substring(0, stringIdsPackages.length-1);

            res.cookie("idsPackageCookie", stringIdsPackages, {maxAge: (1000*60)*5})

            res.redirect("/productCart");
        }



        


         
        // res.render("./productCart/productCart")
    },
};

module.exports = productCartController;


// 
// let package = req.params.idPackages;
// 

//     newProduct.push(package)
//     