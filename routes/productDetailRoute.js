const express = require("express");
const router = express.Router();

const productDetailController = require("../controllers/productDetailController");

//RUTA DE PRODUCT DETAIL

router.get("/", productDetailController.productDetail);

module.exports = router;