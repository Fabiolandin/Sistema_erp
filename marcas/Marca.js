const Sequelize = require("sequelize");
const connection = require("../database/database");

const Marca = connection.define('marcas',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//Marca.sync({force: true});

module.exports = Marca;