function userAdminAuth (req, res, next){

    if(req.session && req.session.userL != undefined && req.session.userL.admin == 1){
        next();
    }else{
        res.redirect("/")
    }

     

}



module.exports = userAdminAuth;