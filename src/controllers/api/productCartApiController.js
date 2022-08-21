const { Sequelize } = require("../../database/models");
const db = require("../../database/models");
const Activities = db.Activity;
const Users = db.User;
const Op = Sequelize.Op;

const productCartApiController = {

    productsSelected : (req, res) => {

        window.onload = async() => {
            const productsS = await (await fetch("api/products")).json();
            console.log(productsS)
        }
    //     let newProduct = [];
    //     let package = req.params.idPackages;
    //     Activities.findByPk(package, {
    //         include : [
    //         {association : "Location"},
    //         {association : "Sport"}
    //     ]
    // })

    //     newProduct.push(package)
    //     res.render("./productCart/productCart", {package})
   
    },
}

module.exports = productCartApiController

