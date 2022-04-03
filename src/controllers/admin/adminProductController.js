module.exports = {
    productAdd: (req, res) => {
        res.render('admin/addProduct', {
            titulo: "Agregar producto"
        })
    },
}