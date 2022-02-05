const express = require('express');
const app = express();
const PORT = 8000;

app.get('/',(req,res)=>{
    res.send('._.')
})
app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`))
