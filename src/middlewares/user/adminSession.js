const adminSession = (req, res, next) => {
    if(req.session.user.rol === "ADMIN"){
        next();
    }else{
        res.render('admin/noAdmin',{
            title : 'Funko | ADMIN',
            stylesheet: 'noAdmin.css',
            session: req.session,
        });
    };
}

module.exports = adminSession;