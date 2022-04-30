const adminSession = (req, res, next) => {
    if(req.session.usuario.rol === "ADMIN"){
        next()
    }else{
        res.send("No tienes permisos para ingresar")
    }
}

module.exports = adminSession;