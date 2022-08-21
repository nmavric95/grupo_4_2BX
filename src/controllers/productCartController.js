//CONTROLLER PARA PRODUCT CART
const path = require("path");
const db = require("../database/models");
const Activities = db.Activity;


const productCartController = {

    productCart : (req, res) => {
        res.render("./productCart/productCart")
    },

    productsSelected : (req, res) => {
        let newProduct = [];
        let package = req.params.idPackages;
        Activities.findByPk(package, {
            include : [
            {association : "Location"},
            {association : "Sport"}
        ]
    })

        newProduct.push(package)
        res.render("./productCart/productCart", {package})
   
    },

};

module.exports = productCartController;