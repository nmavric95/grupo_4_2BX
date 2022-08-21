const express = require("express");
const router = express.Router();

const productCartController = require("../controllers/productCartController");

//RUTA PRODUCT CART
router.get("/", productCartController.productCart);

module.exports = router;