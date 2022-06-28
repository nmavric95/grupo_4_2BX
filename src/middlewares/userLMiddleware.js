const User = require("../models/Users")

function userLMiddleware (req, res, next){
    res.locals.userOk = false;

    //agrego setting al midelware para las cookies para mantener logeado al user

    let emailInCookie = req.cookies.userEmail
    let userFromCookie = User.findByField("email", emailInCookie)
    if (userFromCookie){
        req.session.userLoggedOk = userFromCookie
    }

    if(req.session && req.session.userL){
        res.locals.userOk = true;
        res.locals.userLoggedOk = req.session.userL
    }


    next();

}

module.exports = userLMiddleware;