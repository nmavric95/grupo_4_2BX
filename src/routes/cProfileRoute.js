const express = require("express");
const router = express.Router();

const clientProfileController = require("../controllers/clientProfileController");

//RUTA PERFIL CLIENTE/USUARIO
router.get("/", clientProfileController.clientProfile);

module.exports = router;