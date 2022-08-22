//CONTROLLER PARA PRODUCT CART
const path = require("path");
const db = require("../database/models");

const Activities = db.Activity;
const Users = db.User;

const productCartController = {
    productCart : (req, res) => {
        let toBuy = [];
        res.render("./productCart/productCart", {toBuy})
    },

    productCartAdd : (req, res) => {
        let id = req.params.idPackages;
        let toBuy = [];

        Activities.findByPk(id, {
            include : [{association : "Location"}, {association : "Sport"}]
        })
        .then(packageToBuy => {
            toBuy.push(packageToBuy)
            res.render("./productCart/productCart", {toBuy})
        })
        .catch(error => res.send(error));


         
        // res.render("./productCart/productCart")
    },
};

module.exports = productCartController;


// 
// let package = req.params.idPackages;
// 

//     newProduct.push(package)
//     