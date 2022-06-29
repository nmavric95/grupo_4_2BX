function guestMiddleware (req, res, next){

    if(!(req.session && req.session.userL)){
         res.redirect("/register")
     }

     next();

}



module.exports = guestMiddleware;