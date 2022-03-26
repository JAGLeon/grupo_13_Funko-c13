const express = require('express');
const app = express();
const path  = require('path');
const PORT = 3000;

// Enrutadores 

const  userRouter = require('./src/routes/userRouter')
const homeRouter = require ('./src/routes/homeRouter')

app.use(express.static(path.join(__dirname,'./public')));

// Views Config

app.set('view engine', 'ejs');
app.set('views', 'src/views');

// ROUTES

app.use('/', homeRouter); // Home
app.use('/login',userRouter); // Login
// app.get('/register',(req,res)=>{res.sendFile(path.join(__dirname,'./views/register.html'))});
// app.get('/politicas',(req,res)=>{res.sendFile(path.join(__dirname,'./views/politicas.html'))});
// app.get('/formas-de-pago',(req,res)=>{res.sendFile(path.join(__dirname,'./views/formas-de-pago.html'))});
// app.get('/productDetail', (req,res) => {res.sendFile(path.join(__dirname, './views/productDetail.html'))});
// app.get('/carrito', (req,res) => {res.sendFile(path.join(__dirname, './views/carrito.html'))});


app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`))
