//CONTROLLER PARA PRODUCT DETAIL
const packageController = {
    packages : (req, res) => {
        res.render("./packages/packages")
    },
    packagesDetail : (req, res) => {
        res.render("./packagesDetail/packagesDetail");
    },
};

module.exports = packageController;