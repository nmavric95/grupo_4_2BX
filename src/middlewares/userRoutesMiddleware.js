function userRoutesMiddleware (req, res, next){

    if(req.session && req.session.userL){
         res.redirect("/")
     }

     next();

}



module.exports = userRoutesMiddleware;