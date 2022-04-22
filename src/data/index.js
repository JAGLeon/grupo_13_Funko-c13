const fs = require('fs');
const path = require('path');

module.exports = {
    // Lectura de JSON-User
    getUsers: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    // Escritura y pasado a string de Json-User 
    writeUsers: (data) => {
        fs.writeFileSync(path.join(__dirname, "/users.json"), JSON.stringify(data));
    }, 
    //Lectura de JSON-Product
    getProducts: JSON.parse(fs.readFileSync(path.join(__dirname, "/products.json"), "utf-8")),
    //Escritura y pasado a string de Json-Product
    writeProducts: (data) => {
        fs.writeFileSync(path.join(__dirname, "/products.json"), JSON.stringify(data));
    },
    //Lectura de JSON-Category
    getCategories: JSON.parse(fs.readFileSync(path.join(__dirname, "/category.json"), "utf-8")),
    //Escritura y pasado a string de Json-Category
    writeCategories: (data) => {
        fs.writeFileSync(path.join(__dirname, "/category.json"), JSON.stringify(data));
    },

}