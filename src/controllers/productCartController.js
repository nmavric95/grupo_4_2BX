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
        let totalAmount = 0

        if(stringIdsPackages) {
            let idsPackages = stringIdsPackages.split(",");
            let toBuy = [];
            

            
            Activities.findAll({
                    where: {id: {[Op.in]: idsPackages}},
                    
                })
                .then(values => {
                    values.map(value => {
                        toBuy.push(value.dataValues)
                    })
                    
                    values.map( value => {
                        totalAmount += value.price
                    })
                    res.render("./productCart/productCart", {toBuy, totalAmount})
                })
                .catch(error => res.send(error))
            
        }else{
            let toBuy = [];
            res.render("./productCart/productCart", {toBuy, totalAmount})
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

    },
    
    remove : (req, res) => {

        let stringIdsPackages = req.cookies.idsPackageCookie
        let idToRemove = req.params.id        
        let idsPackages = stringIdsPackages.split(",");
        newStringIdsPackages = ""
            
        let idsFiltered = idsPackages.filter((id) => {
            return id != idToRemove
        })

        idsFiltered.map((id) => {
            newStringIdsPackages += id + ","
        })

        newStringIdsPackages = newStringIdsPackages.substring(0, newStringIdsPackages.length-1);
        console.log(newStringIdsPackages)
            res.cookie("idsPackageCookie", newStringIdsPackages, {maxAge: (1000*60)*5})

            res.redirect("/productCart")

    },

    // pay : (req, res) => {

    //     let stringIdsPackages = req.cookies.idsPackageCookie
    //     let idToPay = req.params.id      

    //     console.log(idToPay)

    //     let products = [];
    //     let quantity = 0;

    //     if (stringIdsPackages){
    //     quantity = quantity + idToPay
    //     products.push(quantity)
    // }

    //     res.redirect("/productCart")


    // }
};

module.exports = productCartController;


// 
// let package = req.params.idPackages;
// 

//     newProduct.push(package)
//     