const express = require('express');
const app = express();
const path  = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname,'public')));

// ROUTES

app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'./views/home.html'))});
app.get('/login',(req,res)=>{res.sendFile(path.join(__dirname,'./views/login.html'))});
app.get('/register',(req,res)=>{res.sendFile(path.join(__dirname,'./views/register.html'))});
app.get('/politicas',(req,res)=>{res.sendFile(path.join(__dirname,'./views/politicas.html'))});
app.get('/formas-de-pago',(req,res)=>{res.sendFile(path.join(__dirname,'./views/formas-de-pago.html'))});

app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`))
