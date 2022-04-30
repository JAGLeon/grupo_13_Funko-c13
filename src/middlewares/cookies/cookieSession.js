const cookieSession = (req, res, next) => {
    if(req.cookies.funko){
        req.session.usuario = req.cookies.funko;
        res.locals.usuario = req.session.usuario;
    }
    next()
}

module.exports = cookieSession;