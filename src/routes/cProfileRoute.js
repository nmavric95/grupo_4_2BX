const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const path = require("path");
const multer = require("multer");
const guestMiddleware = require('../middlewares/guestMiddleware');
const userAdminMiddleware = require("../middlewares/userAdminMiddelware")

//PARTE MULTER

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img/users')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const uploadFile = multer({ storage: storage })
  

const clientProfileController = require("../controllers/clientProfileController");


// EXP-VALIDATOR EDICION/SUMA DE DATOS
const updateValidation = [
  body('name').notEmpty().withMessage('Completa tu nombre'),
  body('lastName').notEmpty().withMessage('Completa tu apellido'),
  body('birthDate').notEmpty().withMessage('Completa tu fecha de nacimiento'),
  body('weight')
    .notEmpty().withMessage('Completa tu peso en kilogramos').bail()
    .isNumeric().withMessage('Debes ingresar un valor numérico'),
  body('height')
    .notEmpty().withMessage('Completa tu altura en metros').bail()
    .isNumeric().withMessage('Debes ingresar un valor numérico'),
  body('email')
  .notEmpty().withMessage('Completar tu email').bail()
  .isEmail().withMessage('Tenes que completar un email valido'),
  body('password').notEmpty().withMessage('Inserta tu contraseña'),
]



//RUTA PERFIL USUARIO - OBTENER VISTA 
router.get("/:id", guestMiddleware, userAdminMiddleware, clientProfileController.clientProfile);

//RUTA PERFIL USUARIO - EDICION/SUMA DE DATOS
// router.get("/:id",guestMiddleware, clientProfileController.edit);
router.put("/:id", uploadFile.any(), updateValidation, clientProfileController.update);

//RUTA PARA LOGOUT
router.post("/logout", clientProfileController.logout)



//RUTA PERFIL USUARIO - EDITAR DATOS

module.exports = router;