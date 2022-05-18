const express = require("express");
const router = express.Router();

const packageController = require("../controllers/packageController");

//RUTA DE PACKAGES
router.get("/", packageController.packages);

//RUTA DE PACKAGE DETAIL
router.get("/detail", packageController.packagesDetail);

module.exports = router;