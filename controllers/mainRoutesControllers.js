//CONTROLLERS PARA LAS MAIN ROUTES
const mainRoutesControllers = {
    index : (req, res) =>{
        res.render("index")
    },

    login : (req, res) => {
        res.render("login")
    }

};

module.exports = mainRoutesControllers