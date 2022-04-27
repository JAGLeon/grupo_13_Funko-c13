const cookieSession = (req, res, next) => {
    if(req.cookies.funko){
        req.session.user = req.cookies.funko;
        res.locals.user = req.session.user;
    }
    next()
}

module.exports = cookieSession;