const express = require('express');
const app = express();
const path  = require('path');
const PORT = 3000;
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const cookieSession = require('./middlewares/cookies/cookieSession')
// Enrutadores 

const userRouter = require('../src/routes/userRouter');
const homeRouter = require ('../src/routes/homeRouter');
const enlacesRouter = require ('../src/routes/enlacesRouter');
const adminRouter = require('../src/routes/adminRouter');

// Middlewares

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('trust proxy', 1);
app.use(session({
    secret:"Funko",
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));
app.use(cookieParser());
app.use(cookieSession);

// Views Config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(methodOverride("_method"));

// ROUTES

app.use('/', homeRouter); // Home
app.use('/usuarios',userRouter); // Login
app.use('/enlaces-utiles', enlacesRouter); // Politicas - FormaDePago
app.use('/admin', adminRouter); // Admin


app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`))
