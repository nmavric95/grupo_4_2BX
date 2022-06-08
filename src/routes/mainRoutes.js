const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

//PARTE MULTER

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const uploadFile = multer({ storage: storage })

const mainRoutesControllers = require("../controllers/mainRoutesControllers");

// RUTAS PRINCIPALES DEL SITIO
// HOME
router.get("/", mainRoutesControllers.index);

//LOGIN
router.get("/login", mainRoutesControllers.login);

//REGISTER
router.get("/register", mainRoutesControllers.register);
router.post("/", uploadFile.any(), mainRoutesControllers.save)

//ABOUTUS
router.get("/aboutUs", mainRoutesControllers.aboutUs);


module.exports = router;


