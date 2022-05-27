const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/adminControllers");


//RUTA CREAR PAQUETE
router.get("/adminForm", adminControllers.adminForm);

router.get("/adminBase", adminControllers.adminBase);

module.exports = router