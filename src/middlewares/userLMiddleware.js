
function userLMiddleware (req, res, next){
    res.locals.userOk = false;

    if(req.session.userL){
         res.locals.userOk = true;
         res.locals.userLoggedOk = req.session.userL
     }
    next();

}

module.exports = userLMiddleware;