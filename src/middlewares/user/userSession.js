const userSession = (req, res, next) => {
    if(req.session.usuario){
        next();
    }else{
        res.redirect('/usuarios/inicio');
    };
};

module.exports = userSession;