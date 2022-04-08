const {getProducts, writeProducts} = require('../../data');

module.exports = {
    /* Envia la vista de listado de productos */
    list: (req, res) => {
        res.render('admin/products/listProducts', {
            title: "Listado de productos",
            stylesheet: 'adminList.css',
            productos: getProducts
        })
    },
    /* Envia la vista de formulario de creación de producto */
    addProduct: (req,res)=>{
        res.render('admin/products/addProduct',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css'
        })
    },
    /* Recibe los datos del form de creación y guarda el producto en la DB */
    createProduct: (req, res) => {
        /* 1 - Crear el objeto producto */
        let lastId = 0;
        getProducts.forEach(product => {
            if(product.id > lastId){
                lastId = product.id;
            }
        });

        let newProduct = {
            ...req.body, 
            id: lastId + 1,
            stock: req.body.stock ? true : false
        };

        // Paso 2 - Guardar el nuevo producto en el array de usuarios

        getProducts.push(newProduct);

       // Paso 3 - Escribir el JSON de productos con el array actual

       writeProducts(getProducts);

       // Paso 4 - Devolver respuesta (redirección)

       res.redirect('/admin/productos');
    },
    editProduct: (req,res)=>{
        /* 1 - Obtener el id del producto */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto a editar */
        let producto = getProducts.find(producto => producto.id === idProducto)
        /* 3 - Mostrar el producto en la vista */
        res.render('admin/products/editProduct',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css',
            producto
        })
    },
    /* Recibe los datos actualizados del form de edición */
    updateProduct: (req, res) => {
        /* 1 - Obtener el id del producto */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto a editar y modificar el producto */
        getProducts.forEach(producto => {
            if(producto.id === idProducto){
                producto.name = req.body.name
                producto.price = req.body.price
                producto.description = req.body.description
                producto.projectId = req.body.projectId
                producto.discount = req.body.discount
                producto.stock = req.body.stock ? true : false
            }
        })

        /* 3 - Guardar los cambios */
        writeProducts(getProducts);

        /* 4 - Respuesta */
        res.redirect('/admin/productos');
    },
    /* Recibe la info del producto a eliminar */
    deleteProduct: (req, res) => {
        /* 1 - Obtener el id del producto a eliminar */
        let idProducto = +req.params.id;
        /* 2 - Buscar el producto dentro del array y eliminarlo */
        getProducts.forEach(producto => {
            if(producto.id === idProducto){
                //Obtener la ubicación del producto a eliminar
                let productToDeleteIndex = getProducts.indexOf(producto);
                //Elimino el producto del array
                getProducts.splice(productToDeleteIndex, 1)
            }
        })
        /* 3 - Sobreescribir el json */
        writeProducts(getProducts);
        /* 4 - Enviar respuesta  */
        res.redirect('/admin/productos');
    },
}
