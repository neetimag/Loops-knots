module.exports = (req  , res , next) =>{
    if(!req.session.isadmin){
       return res.redirect('/');
    }
    return next();
    
}