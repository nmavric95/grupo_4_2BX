const express = require("express");
const router = express.Router();

const productCartController = require("../controllers/productCartController");

//RUTA PRODUCT CART
router.get("/", productCartController.productCart);

router.get("/:idPackages", productCartController.productsSelected);


module.exports = router;