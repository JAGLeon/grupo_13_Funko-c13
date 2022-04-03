const express = require('express');
const app = express();
const path  = require('path');
const process = require('process');
const PORT = 3000;


// Enrutadores 

const adminRouter = require('./src/routes/adminRouter');

app.use(express.static(path.join(__dirname,'./public')));

// Views Config

app.set('view engine', 'ejs');
app.set('views', 'src/views');

// ROUTES

app.use('/admin', adminRouter); // Admin, ABM Productos, ABM Projectos


app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`))
