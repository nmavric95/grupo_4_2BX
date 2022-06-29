const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const path = require("path");
const multer = require("multer");
const userRoutesMiddleware = require('../middlewares/userRoutesMiddleware');

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


// MIDDLEWARE CREACION

const logMiddleware = require('../middlewares/logMiddleware')

// EXP-VALIDATOR REGISTER

const registerValidation = [
  body('name').notEmpty().withMessage('Completa tu nombre'),
  body('lastName').notEmpty().withMessage('Completa tu apellido'),
  body('birthDate').notEmpty().withMessage('Completa tu fecha de nacimiento'),
  body('email')
  .notEmpty().withMessage('Completar tu email').bail()
  .isEmail().withMessage('Tenes que completar un email valido'),
  body('password').notEmpty().withMessage('Inserta tu contraseña'),
];

// VALIDATOR LOGIN

const loginValidation = [
  body("email")
  .notEmpty().withMessage('Completar tu email').bail()
  .isEmail().withMessage('Tenes que completar un email valido'),
  body('password').notEmpty().withMessage('Inserta tu contraseña'),
]

// RUTAS PRINCIPALES DEL SITIO
// HOME
router.get("/", mainRoutesControllers.index);

//LOGIN
router.get("/login", userRoutesMiddleware,mainRoutesControllers.login);
router.post("/login", uploadFile.any(), loginValidation , mainRoutesControllers.successLogin);

//REGISTER
router.get("/register", userRoutesMiddleware, mainRoutesControllers.register);
router.post("/register", uploadFile.any(), registerValidation, logMiddleware, mainRoutesControllers.save)

//ABOUTUS
router.get("/aboutUs", mainRoutesControllers.aboutUs);

//LOGOUT
//router.get("/logout", mainRoutesControllers.logOut);



module.exports = router;


