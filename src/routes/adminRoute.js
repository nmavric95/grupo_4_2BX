// REQUIRED
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require('express-validator');

//MULTER

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/img/activities');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
  
const upload = multer({ storage: storage })

// EXP-VALIDATOR CREACION/EDICION PAQUETES
const packageValidation = [
  body('activityName').notEmpty().withMessage('Completa el nombre de la actividad'),
  body('sport').notEmpty().withMessage('Debes seleccionar un deporte'),
  body('startTime').notEmpty().withMessage('Debes ingresar un horario de inicio'),
  body('endTime').notEmpty().withMessage('Debes ingresar un horario de finalizado'),
  body('location').notEmpty().withMessage('Debes ingresar una localizacion'),
  body('price')
    .notEmpty().withMessage('Debes ingresar un valor').bail()
    .isNumeric().withMessage('Debes ingresar un valor numérico'),
  body('reservationPrice')
    .notEmpty().withMessage('Debes ingresar un valor').bail()
    .isNumeric().withMessage('Debes ingresar un valor numérico'),
  body('description')
  .notEmpty().withMessage('Debes ingresar una descripcion'),
]


//CONTROLLERS
const adminControllers = require("../controllers/adminControllers");


//RUTA CREAR PAQUETE
router.get("/adminForm", adminControllers.adminForm);
router.post("/adminForm", upload.any(), packageValidation ,adminControllers.adminFormStore);

//RUTA EDITAR PAQUETE
router.get("/adminForm/:idPackages", adminControllers.adminFormEdit);
router.put("/adminForm/:idPackages", upload.any(), packageValidation,adminControllers.adminFormEditSend);

router.get("/adminBase", adminControllers.adminBase);

router.delete("/adminBase/delete/:idPackages", adminControllers.adminDelete);

module.exports = router