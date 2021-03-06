require("dotenv").config();
const express = require('express');
const app = express();
const path  = require('path');
const PORT =  /* Number(process.env.PORT) || */ 3000;
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cookieSession = require('./middlewares/cookies/cookieSession');
const db = require("./database/models");


// Enrutadores 
const productosRouter = require('./routes/productosRouter');
const categoriesRouter = require('../src/routes/categoriesRouter');
const userRouter = require('../src/routes/userRouter');
const homeRouter = require ('../src/routes/homeRouter');
const enlacesRouter = require ('../src/routes/enlacesRouter');
const adminRouter = require('../src/routes/adminRouter');
const apiRouter = require('../src/routes/apiRoutes/apiRouter');

const { title } = require('process');

// Middlewares

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));

// Session

app.set('trust proxy', 1);
app.use(session({
    secret:"Funko Company",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

// Cookies

app.use(cookieParser());
app.use(cookieSession);

// Views Config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));


// ROUTES

app.use('/', homeRouter); // Home
app.use('/usuarios',userRouter); // Login
app.use('/franquicias', categoriesRouter); // Categorias de Productos
app.use('/productos', productosRouter); // Productos
app.use('/enlaces-utiles', enlacesRouter); // Politicas - FormaDePago
app.use('/admin', adminRouter); // Admin
app.use('/api', apiRouter); // Api

/* Vista not found */
app.use((req, res, next) => {
    db.Category.findAll()
    .then(categorias => {
        res.status(404).render("not-found", {
            title: "Funko | Error 404",
            stylesheet: "carrito.css",
            session: req.session,
            categorias
        })
    })
    .catch(error => res.send(error));
})


app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`));
