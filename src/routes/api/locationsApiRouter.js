const express = require("express");
const router = express.Router();
const path = require("path")


const locationsApiController = require("../../controllers/api/locationsApiController")

//Rutas
router.get("/", locationsApiController.list);


module.exports = router;