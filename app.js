const express = require('express');
const app = express();
const path  = require('path');
const PORT = 3000;

// Enrutadores 

const userRouter = require('./src/routes/userRouter');
const homeRouter = require ('./src/routes/homeRouter');
const enlacesRouter = require ('./src/routes/enlacesRouter');
const adminRouter = require('./src/routes/adminRouter');

app.use(express.static(path.join(__dirname,'./public')));

// Views Config

app.set('view engine', 'ejs');
app.set('views', 'src/views');

// ROUTES

app.use('/', homeRouter); // Home
app.use('/usuarios',userRouter); // Login
app.use('/enlaces-utiles', enlacesRouter); // Politicas - FormaDePago
// app.get('/productDetail', (req,res) => {res.sendFile(path.join(__dirname, './views/productDetail.html'))});
// app.get('/carrito', (req,res) => {res.sendFile(path.join(__dirname, './views/carrito.html'))});
app.use('/admin', adminRouter);


app.listen(PORT,()=> console.log(`Puerto ${PORT} 
link: http://localhost:${PORT}`))
