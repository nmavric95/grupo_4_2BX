// REQUIRED
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

//MULTER

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
  
const upload = multer({ storage: storage })


//CONTROLLERS
const adminControllers = require("../controllers/adminControllers");


//RUTA CREAR PAQUETE
router.get("/adminForm", adminControllers.adminForm);
router.post("/adminForm", upload.any() ,adminControllers.adminFormStore);

//RUTA EDITAR PAQUETE
router.get("/adminForm/:idPackages", adminControllers.adminFormEdit);
router.put("/adminForm/:idPackage", upload.any() ,adminControllers.adminFormEditSend);

router.get("/adminBase", adminControllers.adminBase);

router.delete("/adminBase/delete/:idPackages", adminControllers.adminDelete);

module.exports = router