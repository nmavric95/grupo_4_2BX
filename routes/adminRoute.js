const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/adminControllers");


//RUTA CREAR PAQUETE
router.get("/adminForm", adminControllers.adminForm);

router.get("/adminBase", adminControllers.adminBase);

router.delete("/adminBase/delete/:idPackages", adminControllers.adminDelete);

module.exports = router