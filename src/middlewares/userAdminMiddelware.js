function userAdminMiddleware (req, res, next){

    if(req.session && req.session.userL.admin == 1){
         res.redirect("/userAdmin/adminBase")
     }

     next();

}



module.exports = userAdminMiddleware;