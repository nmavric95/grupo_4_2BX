const express = require("express");
const router = express.Router();
const path = require("path")


const packageApiController = require("../../controllers/api/packageApiController")

//Rutas
router.get("/", packageApiController.list);
// router.post("/package", packageApiController.create)
router.get("/:idPackages", packageApiController.detail)

router.get("/searchPackages/:criteria/:value", packageApiController.search)
// router.put("/package/:idPackages", packageApiController.edit)
router.delete("/delete/idPackages", packageApiController.delete)

module.exports = router;