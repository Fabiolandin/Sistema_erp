const Sequelize = require("sequelize");
const connection = require("../database/database");
//importando marca para fazer o relacionamento
const Marca = require("../marcas/Marca");

//criando banco de produtos
const Produto = connection.define('produtos',{
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },description: {
        type: Sequelize.STRING,
        allowNull: false
    },value: {
        type: Sequelize.FLOAT,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


Marca.hasMany(Produto); //uma marca tem muitos produtos
Produto.belongsTo(Marca); //uma produto pertence a uma marca

//Produto.sync({force: true});

module.exports = Produto;