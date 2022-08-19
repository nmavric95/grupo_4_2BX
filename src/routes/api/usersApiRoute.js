const express = require("express");
const router = express.Router();
const path = require("path")


const usersApiController = require("../../controllers/api/usersApiController")

//Rutas
router.get("/", usersApiController.list);
// router.post("/package", usersApiController.create)
router.get("/:idUser", usersApiController.detail)

router.get("/searchUsers/:userName", usersApiController.search)
// router.put("/package/:idPackages", usersApiController.edit)
router.delete("/delete/idUser", usersApiController.delete)

module.exports = router;