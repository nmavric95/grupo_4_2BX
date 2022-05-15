//CONTROLLERS PARA LAS MAIN ROUTES
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
        res.render("./index/aboutUs")
    },

};

module.exports = mainRoutesControllers