//CONTROLLERS PARA LAS MAIN ROUTES

const path = require("path")
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');


// DB SEQUELIZE
const db = require("../database/models");
const Users = db.User;
const Actions = db.Action;
const Activities = db.Activity


const crew = [
    {
        name:"Ana Cerruti",
        description: "Vivo en CABA, tengo 32 años y soy Lic. en Deporte y Educacion Fisica. Estudio actualmente Ingenieria en Alimentos y trabajo para una consultora de seguridad e higiene. Me encanta el deporte, sobretodo el tenis y me fascina la musica. Me gusta tambien cantar y bailar.",
        image: "/img/crew/fotoAna.jpeg", 
        instagram: "https://www.instagram.com/anycerruti/",
        linkedin: "https://www.linkedin.com/in/ana-mar%C3%ADa-cerruti-61325261/",
    },
    {
        name:"Iván Lucas Aichino",
        description: "Soy de la provincia de Córdoba y vivo en Cba Capital, tengo 31 años. Disfruto mucho de las actividades al aire libre y de la practica de deportes tales como escalada deportiva, trekking, ciclismo y buceo. Tambien me considero aficionado a la computación, ahora mismo me encuentro incursionando en el mundo de la programación.",
        image: "/img/crew/fotoIvan.jpg", 
        instagram: "https://www.instagram.com/fotografia.ivanaichino/",
        linkedin: "",
    },
    {
        name:"Nadia Mavric",
        description: "Tengo 26 años, trabajo en finanzas y vivo en CABA. Mi hobbie es el paracaidismo, practico el deporte hace 3 años y tengo 200 saltos. Disfruto de realizar deportes al aire libre y cuando visito un lugar nuevo, busco experiencias divertidas completar mis viajes.",
        image: "/img/crew/fotoNadia.jpg", 
        instagram: "https://www.instagram.com/nadiimavric/",
        linkedin: "https://www.linkedin.com/in/nadia-mavric-884a39b2/",
    },
    {
        name:"Rodrigo Aller",
        description: "Actualmente vivo en CABA, tengo 32 años y trabajo en finanzas hace 7 años. En mi tiempo libre me gusta correr y estar al aire libre.",
        image: "/img/crew/fotoRodri.PNG", 
        instagram: "",
        linkedin: "",
    },
]


const mainRoutesControllers = {
    index : (req, res) =>{
        let dataBasePackages = Activities.findAll()
        let offerPackages = Activities.findAll({
            where: {sale_ratio: 1}
        })
        Promise.all([dataBasePackages, offerPackages])
        .then(([dataBasePackages, offerPackages]) => res.render("./index/index", {dataBasePackages, offerPackages, succesUser : req.session.userL }))
        .catch(error => res.send(error))
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
            if(userToLog.admin ==1){
                res.redirect("/userAdmin/adminBase")
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
    let emailRegister = req.body.email
    let existingEmail = {}
    let resultValidation = validationResult(req);
        Users.findAll({
            where: {email: emailRegister}
        })
        .then(data => {
            existingEmail = data

        if(existingEmail === {}){
       
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
        } else{
            res.render("./register/register", {errors: {
                email: {
                    msg: "Ya existe un usuario con este email"}}, oldData: req.body})}
        })
        .catch(error => res.send(error))
        
    },
           
    aboutUs : (req, res) => {
        res.render("./index/aboutUs",{crew: crew})
    },
};

module.exports = mainRoutesControllers