//CONTROLLER PARA PRODUCT CART
const path = require("path");
const db = require("../database/models");

const Activities = db.Activity;
const Users = db.User;

const productCartController = {

    

    productCart : (req, res) => {
        res.render("./productCart/productCart")
    },
};

module.exports = productCartController;