//CONTROLLERS PARA LAS MAIN ROUTES

const path = require("path")
const fs = require("fs")
const pathDB = path.resolve("./data/userDB.json")
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');


// DB SEQUELIZE
const db = require("../database/models");
const Users = db.User;
const Actions = db.Action;


//const pathDB = path.join(__dirname, '../data/userDB.json');
const userDB = JSON.parse(fs.readFileSync(pathDB, "utf-8"))

const User = require('../models/Users');

const crew = [
    {
        name:"Ana Cerruti",
        description: "Vivo en CABA, tengo 32 años y soy Lic. en Deporte y Educacion Fisica. Estudio actualmente Ingenieria en Alimentos y trabajo para una consultora de seguridad e higiene. Me encanta el deporte, sobretodo el tenis y me fascina la musica. Me gusta tambien cantar y bailar.",
        image: "/img/fotoAna.jpeg", 
        instagram: "https://www.instagram.com/anycerruti/",
        linkedin: "https://www.linkedin.com/in/ana-mar%C3%ADa-cerruti-61325261/",
    },
    {
        name:"Iván Lucas Aichino",
        description: "Soy de la provincia de Córdoba y vivo en Cba Capital, tengo 31 años. Disfruto mucho de las actividades al aire libre y de la practica de deportes tales como escalada deportiva, trekking, ciclismo y buceo. Tambien me considero aficionado a la computación, ahora mismo me encuentro incursionando en el mundo de la programación.",
        image: "/img/fotoIvan.jpg", 
        instagram: "https://www.instagram.com/fotografia.ivanaichino/",
        linkedin: "",
    },
    {
        name:"Nadia Mavric",
        description: "Tengo 26 años, trabajo en finanzas y vivo en CABA. Mi hobbie es el paracaidismo, practico el deporte hace 3 años y tengo 200 saltos. Disfruto de realizar deportes al aire libre y cuando visito un lugar nuevo, busco experiencias divertidas completar mis viajes.",
        image: "/img/fotoNadia.jpg", 
        instagram: "https://www.instagram.com/nadiimavric/",
        linkedin: "https://www.linkedin.com/in/nadia-mavric-884a39b2/",
    },
    {
        name:"Rodrigo Aller",
        description: "Actualmente vivo en CABA, tengo 32 años y trabajo en finanzas hace 7 años. En mi tiempo libre me gusta correr y estar al aire libre.",
        image: "/img/fotoRodri.PNG", 
        instagram: "",
        linkedin: "",
    },
]


const mainRoutesControllers = {
    index : (req, res) =>{
       res.render("./index/index", {succesUser : req.session.userL})
    },

    login : (req, res) => {
        res.render("./register/login")
    },

    successLogin : (req, res) => {
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            res.render("./register/login", {errors: errors.mapped(), oldData: req.body})
        }

        Users.findOne({where: {email: req.body.email}})
        .then(userToLog => {
        
        if(!userToLog){
            return  res.render("./register/login", 
            {errors: {email: {msg: "Este email no está registrado"}}, oldData: req.body})}
        
        if (bcrypt.compareSync(req.body.password, userToLog.password)){
            delete userToLog.password
            req.session.userL = userToLog
            if(req.body.rememberEmail){
                //aca está seteada la cookie por 2 min
                res.cookie("userEmail", req.body.email, {maxAge: (1000*60)*2})
                }
            res.redirect("/")

        }else{
            res.render("./register/login", {errors: {
                password: {
                    msg: "Las credenciales son inválidas"}}, oldData: req.body})}
        })
        .catch(error => res.send(error))
    }, 


    
    register : (req, res) => {

        res.render("./register/register")
    
    },

    createN: (req,res) => {

    let resultValidation = validationResult(req);

        if(!resultValidation.isEmpty()) {
            res.render("./register/register", {
                errors : resultValidation.mapped(),
                oldData : req.body,
            })     

        }else{
            let defaultImage = "Logo1FondoNegro.jpg";
            let newUserToCreate = {
             name : req.body.name,
             last_name : req.body.lastName,
             birth_date : req.body.birthDate,
             email : req.body.email,
             password : bcrypt.hashSync(req.body.password, 10),
             image : defaultImage
            }

           Users.create(newUserToCreate);
           res.redirect("/login") 
        }
    },
           
    aboutUs : (req, res) => {
        res.render("./index/aboutUs",{crew: crew})
    },
};

module.exports = mainRoutesControllers