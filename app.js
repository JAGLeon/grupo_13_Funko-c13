const express = require('express');
const app = express();
const path  = require('path');
const PORT = 3000;

app.use(express.static(path.join(__dirname,'public')));

// ROUTES

// app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'./views/home.html'))}); creo que debe de ser así
app.get('/',(req,res)=>{res.sendFile(path.join(__dirname,'./views/login.html'))});
app.get('/register',(req,res)=>{res.sendFile(path.join(__dirname,'./views/register.html'))});

app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`))
