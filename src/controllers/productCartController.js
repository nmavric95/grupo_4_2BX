//CONTROLLER PARA PRODUCT CART
const path = require("path");
const db = require("../database/models");
const userRoutesMiddleware = require("../middlewares/userRoutesMiddleware");

const Activities = db.Activity;
const Users = db.User;

const productCartController = {
    productCart : (req, res) => {

        let stringIdsPackages = req.cookies.idsPackageCookie

        console.log(stringIdsPackages)

        if(stringIdsPackages) {
            let idsPackages = stringIdsPackages.split(",");
            let toBuy = [];

            // Activities.findAll({include : [{association : "Location"}, {association : "Sport"}]})
            //     .then(allPackages => {
            //         toBuy = allPackages.map(package => {

            //         })
            //     })
            //     .catch(error => res.send(error));



            // idsPackages.forEach(id => {
            //     Activities.findByPk(id, {
            //         include : [{association : "Location"}, {association : "Sport"}]
            //     })
            //     .then(packageToBuy => {
            //         toBuy.push(packageToBuy)
            //         res.render("./productCart/productCart", {toBuy})
            //     })
            //     .catch(error => res.send(error));
            // })

            // idsPackages.map(id => {
            //     Activities.findByPk(id, {
            //         include : [{association : "Location"}, {association : "Sport"}]
            //     })
            //     .then(packageToBuy => {
            //         toBuy.push(packageToBuy)
            //         res.render("./productCart/productCart", {toBuy})
            //     })
            //     .catch(error => res.send(error));
            // })

            // toBuy = idsPackages.map(id => {
            //         Activities.findByPk(id, {
            //             include : [{association : "Location"}, {association : "Sport"}]
            //         })
            //         .then(packageToBuy => {
            //             let package = packageToBuy
            //             return package
            //         })
            //         .catch(error => res.send(error)); 
            //     })

            // console.log(toBuy)

            // res.render("./productCart/productCart", {toBuy})
            
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
            let idsPackages = [];

            let stringIdsPackages = "";

            idsPackages.push(id);

            for(let i = 0; i < idsPackages.length; i++) {
                stringIdsPackages += idsPackages[i] + ","
            }
            
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