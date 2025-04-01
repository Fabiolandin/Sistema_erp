//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();
const Produto = require("../produtos/Produto");
const adminAuth = require("../middlewares/adminAuth");
const Compra = require("../compras/Compra");

//Rota para visualizar compras
router.get("/compras", (req, res) => {
    //buscando todas as compras e exibindo
    Compra.findAll({
        include:[{model: Produto}]
    }).then(compras =>{
        res.render("admin/compras", {compras: compras});
    })
})


// Rota para criar nova compra
router.get("/admin/compras/new", (req, res) => {
    Produto.findAll().then(produtos => {
        res.render("admin/compras/new", { produtos: produtos });
    }).catch(error => {
        console.log("Erro ao carregar os produtos:", error);
        res.redirect("/admin/compras");
    });
});


//rota para salvar nova compra no banco
router.post("/compras/save", (req, res) => {

    var produtoId = req.body.produto;
    var quantidade = req.body.quantidade;

    if(produtoId && quantidade){
        // Busca o produto para obter seu preço
        Produto.findByPk(produtoId).then(produto => {
            if (produto) {
                // Calcula o valor total com base no preço do produto e na quantidade
                var valorTotal = produto.value * quantidade;
        
                // Cria a compra no banco de dados
                Compra.create({
                    produtoId: produtoId,
                    quantidade: quantidade,
                    valorTotal: valorTotal
                }).then(() => {
                    // Atualiza o estoque do produto (provavelmente você quer subtrair a quantidade, não somar)
                    Produto.update({
                        estoque: produto.estoque + quantidade
                    }, {
                        where: { id: produtoId }
                    }).then(() => {
                        res.redirect("/admin/compras");
                    }).catch(error => {
                        console.log("Erro ao atualizar estoque:", error);
                        res.redirect("/admin/compras/new");
                    });
                }).catch(error => {
                    console.log("Erro ao salvar compra:", error);
                    res.redirect("/admin/compras/new");
                });
            } else {
                res.redirect("/admin/compras/new");
            }
        }).catch(error => {
            console.log("Erro ao buscar produto:", error);
            res.redirect("/admin/compras/new");
        });
    } else {
        res.redirect("/admin/compras/new");
    }
});

module.exports = router;