const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../../database/models');

module.exports = () => {
    return(
        passport.use(
            new GoogleStrategy({
                clientID: '563512132209-e9gi2tqdj6fl2pmad17dp9c9n74j6950.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: "http://localhost:3000/usuarios/autenticacion/google/llamada"
            },
            function(accessToken, refreshToken, profile, done) {
                db.User.findOrCreate({
                    where: {
                        social_id: profile.id
                    },
                    defaults:{
                        name: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        password: null,
                        social_id: profile.id,
                        rol: "USER",
                        userName: profile.name.givenName,
                        province: " " ,
                        icon : "userG.png" || profile.photos[0].value,
                    }
                })
                .then(usuario =>{
                    return done(null, usuario);
                })
                .catch(error=>{
                    console.log(error);
                })
            }
            )
        )
    )
}