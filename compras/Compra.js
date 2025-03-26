const Sequelize = require("sequelize");
const connection = require("../database/database");
//importando marca para fazer o relacionamento
const Produto = require("../produtos/Produto");

//Criando compra no banco de dados
const Compra = connection.define('compras',{
    produtoId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model:Produto, // Fazendo referencia ao modelo produto
            key: 'id'
        },
        onUpdate: 'CASCADE',  // Atualizar automaticamente se o produto for modificado
        onDelete: 'CASCADE'   // Deletar as compras associadas se o produto for deletado
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },valorTotal:{
        type:Sequelize.FLOAT,
        allowNull:false
    }

})

Produto.hasMany(Compra);  // Um produto pode aparecer em várias compras
Compra.belongsTo(Produto); // uma compra pertence a um produto

//Compra.sync({force: true});

module.exports = Compra;