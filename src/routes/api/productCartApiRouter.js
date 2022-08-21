const express = require("express");
const router = express.Router();
const path = require("path")


const productCartApiController = require("../../controllers/api/productCartApiController")

router.get("/", productCartApiController.productsSelected);

module.exports = router;