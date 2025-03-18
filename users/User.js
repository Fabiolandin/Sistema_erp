const Sequelize = require("sequelize");
const connection = require("../database/database");

//banco de dados  user com email e password
const User = connection.define('users',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//User.sync({force: true});

module.exports = User;