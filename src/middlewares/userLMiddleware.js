const db = require("../database/models")

const Users= db.User

function userLMiddleware (req, res, next){
    res.locals.userOk = false;

    if(req.session.userL){
         res.locals.userOk = true;
         res.locals.userLoggedOk = req.session.userL
     }

    //agrego setting al midelware para las cookies para mantener logeado al user

    let emailInCookie = req.cookies.userEmail
    Users.findOne({email: emailInCookie})
    .then(userFromCookie => {
        if (userFromCookie){
        req.session.userLoggedOk = userFromCookie
    }

    if(req.session && req.session.userL){
        res.locals.userOk = true;
        res.locals.userLoggedOk = req.session.userL
    }

    next();})
    .catch(error => res.send(error))

}

module.exports = userLMiddleware;