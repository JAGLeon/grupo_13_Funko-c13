const express = require('express');
const app = express();
const path  = require('path');
const PORT = 3000;

// Enrutadores 

const userRouter = require('./routes/userRouter');
const homeRouter = require ('./routes/homeRouter');
const enlacesRouter = require ('./routes/enlacesRouter');

app.use(express.static(path.join(__dirname,'../public')));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Views Config

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

// ROUTES

app.use('/', homeRouter); // Home
app.use('/usuarios',userRouter); // Login
app.use('/enlaces-utiles', enlacesRouter); // Politicas - FormaDePago
// app.get('/productDetail', (req,res) => {res.sendFile(path.join(__dirname, './views/productDetail.html'))});
// app.get('/carrito', (req,res) => {res.sendFile(path.join(__dirname, './views/carrito.html'))});


app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`))
