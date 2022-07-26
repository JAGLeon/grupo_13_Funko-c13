const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../../database/models');
clientID = process.env.clientID;
clientSecret = process.env.clientSecret;
module.exports = () => {
    return(
        passport.use(
            new GoogleStrategy({
                clientID,
                clientSecret,
                callbackURL: "http://localhost:3000/usuarios/autenticacion/google/llamada"
            },
            function(profile, done) {
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
                .then(user =>{
                    return done(null, user);
                })
                .catch(error=>{
                    console.log(error);
                })
            }
            )
        )
    )
}