const express = require("express");
const router = express.Router();
const path = require("path")


const sportsApiController = require("../../controllers/api/sportsApiController")

//Rutas
router.get("/", sportsApiController.list);


module.exports = router;