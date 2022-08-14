const express = require("express");
const router = express.Router();
const path = require("path")


const packageApiController = require("../../controllers/api/packageApiController")

//Rutas
router.get("/package", packageApiController.list);
// router.post("/package", packageApiController.create)
router.get("/package/:idPackages", packageApiController.detail)
// router.post("/package/:idPackages", packageApiController.edit)
router.delete("/packages/delete/idPackages", packageApiController.delete)

module.exports = router;