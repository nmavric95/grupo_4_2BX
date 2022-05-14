const express = require("express");
const router = express.Router();

const mainRoutesControllers = require("../controllers/mainRoutesControllers");
// RUTAS PRINCIPALES DEL SITIO

// HOME
router.get("/", mainRoutesControllers.index);

//LOGIN
router.get("/login", mainRoutesControllers.login);


module.exports = router;


