//CONTROLLER PARA ADMIN

const adminControllers = {
    adminForm : (req, res) => {
        res.render("./user/adminForm")
    },
    adminBase : (req,res) =>{
        res.render("./user/adminBase")
    }
};

module.exports = adminControllers;