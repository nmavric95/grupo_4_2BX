//CONTROLLERS PARA LAS MAIN ROUTES

const { urlencoded } = require("express");

const crew = [
    {
        name:"Ana Cerruti",
        description: "Vivo en CABA, tengo 32 años y soy Lic. en Deporte y Educacion Fisica. Estudio actualmente Ingenieria en Alimentos y trabajo para una consultora de seguridad e higiene. Me encanta el deporte, sobretodo el tenis y me fascina la musica. Me gusta tambien cantar y bailar.",
        image: "", 
        instagram: "",
        linkedin: "",
    },
    {
        name:"Iván Lucas Achino",
        description: "Soy de la provincia de Córdoba y vivo en Cba Capital, tengo 31 años. Actualmente me desempeño como mecánico de automóviles y soy técnico en Fotografía, actividad que llevo adelante tanto laboralmente como por hobby. Disfruto mucho de las actividades al aire libre y de la practica de deportes tales como escalada deportiva, trekking, ciclismo y buceo. Tambien me considero aficionado a la computación, ahora mismo me encuentro incursionando en el mundo de la programación.",
        image: "", 
        instagram: "",
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
        image: "", 
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
        res.render("./register/register")
    },

    aboutUs : (req, res) => {
        res.render("./index/aboutUs",{crew: crew})
    },

};

module.exports = mainRoutesControllers