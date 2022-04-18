const{getUsers,writeUsers} = require('../data')

module.exports = {
    login: (req,res) => {
        res.render('login',{
            title : 'Funko | Inicio',
            stylesheet: 'forms.css'
        });
    },
    register:(req,res)=>{
        res.render('register',{
            title : 'Funko | Registro',
            stylesheet: 'forms.css'
        });
    },
    registrarUser : (req,res)=>{
        let lastId = 0;
        getUsers.forEach(user => {
            if (user.id > lastId) {
                lastId = user.id
            };
        });

		let newUser = {
			id : lastId + 1,
			...req.body,
			avatar : req.file ? req.file.filename : "user.jpg"
		}

        getUsers.push(newUser);
        writeUsers(getUsers);
        res.redirect('/usuarios/inicio');
    },
    perfil : (req,res)=>{
        res.render('editUser',{
            title : 'Funko | Perfil',
            stylesheet : 'perfil.css'
        })
    }
}