module.exports = {
    politicaPrivacidad: (req,res)=>{
        res.render('politicas',{
            title : 'Funko | Politica',
            stylesheet: 'politica.css'
        })
    },
    formasDePago: (req,res)=>{
        res.render('formasDePago',{
            title : 'Funko | Pagos',
            stylesheet: 'pagos.css'
        })
    }
}