const Sequelize = require("sequelize");

//connection com o banco 1:nome do banco, 2 root, senha do banco
const connection = new Sequelize('sistema_erp', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

//exportando banco
module.exports = connection;