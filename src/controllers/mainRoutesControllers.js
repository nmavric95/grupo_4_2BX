//CONTROLLERS PARA LAS MAIN ROUTES

const path = require("path")
const fs = require("fs")
const pathDB = path.resolve("./data/userDB.json")

const userDB = JSON.parse(fs.readFileSync(pathDB, "utf-8"))

const crew = [
    {
        name:"Ana Cerruti",
        description: "Vivo en CABA, tengo 32 años y soy Lic. en Deporte y Educacion Fisica. Estudio actualmente Ingenieria en Alimentos y trabajo para una consultora de seguridad e higiene. Me encanta el deporte, sobretodo el tenis y me fascina la musica. Me gusta tambien cantar y bailar.",
        image: "/img/fotoAna.jpeg", 
        instagram: "https://www.instagram.com/anycerruti/",
        linkedin: "https://www.linkedin.com/in/ana-mar%C3%ADa-cerruti-61325261/",
    },
    {
        name:"Iván Lucas Achino",
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
        res.render("./index/index")
    },

    login : (req, res) => {
        res.render("./register/login")
    },

    register : (req, res) => {
        res.render("./register/register", {userDB: userDB})
    },

    save: (req, res) => {
        let defaultImage = "Logo1FondoNegro.jpg"; 
        let newUser = {
            id : userDB[userDB.length - 1].id + 1,
            ...req.body,
            image : defaultImage,
        };

        userDB.push(newUser);
        fs.writeFileSync(pathDB, JSON.stringify(userDB, null, " "));

        res.redirect(("/userClient/" + newUser.id));
        // res.send('Succes')
    },

   
           
    aboutUs : (req, res) => {
        res.render("./index/aboutUs",{crew: crew})
    },
    // packages : (req, res) => {
    //     res.render("./packages/packages")
    // },

};

module.exports = mainRoutesControllers