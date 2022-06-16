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
  

const clientProfileController = require("../controllers/clientProfileController");


//RUTA PERFIL USUARIO - ENVIAR INFORMACION
// router.get("/", clientProfileController.clientProfile);
// router.post("/", uploadFile.any(), clientProfileController.create);

//MODIFICACIONES IVAN
router.get("/:id", clientProfileController.clientProfile);
router.post("/", uploadFile.any(), clientProfileController.create);

router.get("/edit/:idUser", uploadFile.any(), clientProfileController.edit)
router.put("/edit", uploadFile.any(), clientProfileController.edit)



//RUTA PERFIL USUARIO - EDITAR DATOS

module.exports = router;