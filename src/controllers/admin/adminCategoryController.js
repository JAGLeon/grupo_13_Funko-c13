const {getCategories, writeCategories} = require('../../data');

module.exports = {
    /* Envia la vista de listado de franquicias */
    list: (req, res) => {
        res.render('admin/categories/listCategories', {
            title: "Listado de franquicias",
            stylesheet: 'adminList.css',
            categories: getCategories,
            session: req.session
        })
    },
    /* Envia la vista de formulario de creación de franquicia */
    addCategory: (req,res)=>{
        res.render('admin/categories/addCategories',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css',
            session: req.session
        })
    },
    /* Recibe los datos del form de creación y guarda el franquicia en la DB */
    createCategory: (req, res) => {
        /* 1 - Crear el objeto franquicia */
        let lastId = 0;
        getCategories.forEach(category => {
            if(category.id > lastId){
                lastId = category.id;
            }
        });

        let newCategory = {
            ...req.body, 
            id: lastId + 1
        };

        // Paso 2 - Guardar el nuevo franquicia en el array de franquicias

        getCategories.push(newCategory);

       // Paso 3 - Escribir el JSON de franquicias con el array actual

       writeCategories(getCategories);

       // Paso 4 - Devolver respuesta (redirección)

       res.redirect('/admin/franquicias');
    },
    editCategory: (req,res)=>{
        /* 1 - Obtener el id de la franquicia */
        let idCategory = +req.params.id;
        /* 2 - Buscar la franquicia a editar */
        let category = getCategories.find(category => category.id === idCategory)
        /* 3 - Mostrar la franquicia en la vista */
        res.render('admin/categories/editCategories',{
            title : 'Funko | Admin',
            stylesheet: 'formsEditAdd.css',
            category,
            session: req.session
        })
    },
    /* Recibe los datos actualizados del form de edición */
    updateCategory: (req, res) => {
        /* 1 - Obtener el id de la franquicia */
        let idCategory = +req.params.id;
        /* 2 - Buscar la franquicia a editar y modificarla */
        getCategories.forEach(category => {
            if(category.id === idCategory){
                category.name = req.body.name
            }
        })

        /* 3 - Guardar los cambios */
        writeCategories(getCategories);

        /* 4 - Respuesta */
        res.redirect('/admin/franquicias');
    },
    /* Recibe la info del franquicia a eliminar */
    deleteCategory: (req, res) => {
        /* 1 - Obtener el id del franquicia a eliminar */
        let idCategory = +req.params.id;
        /* 2 - Buscar la franquicia dentro del array y eliminarlo */
        getCategories.forEach(category => {
            if(category.id === idCategory){
                //Obtener la ubicación de la franquicia a eliminar
                let categoryToDeleteIndex = getCategories.indexOf(category);
                //Elimino la franquicia del array
                getCategories.splice(categoryToDeleteIndex, 1)
            }
        })
        /* 3 - Sobreescribir el json */
        writeCategories(getCategories);
        /* 4 - Enviar respuesta  */
        res.redirect('/admin/franquicias');
    },
}
