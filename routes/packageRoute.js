const express = require("express");
const router = express.Router();

const packageController = require("../controllers/packageController");

//RUTA DE PRODUCT DETAIL

router.get("/", packageController.productDetail);

module.exports = router;