//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();
const Produto = require("../produtos/Produto");
const adminAuth = require("../middlewares/adminAuth");
const Compra = require("../compras/Compra");

//Rota para visualizar compras
router.get("/compras", (req, res) => {
    res.render("admin/compras");
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


//rota para salvar nova marca no banco
router.post("/compras/save", (req, res) => {

    var produtoId = req.body.produto;
    var name = req.body.name;
    var quantidade = req.body.quantidade;
    var valorTotal = req.body.valorTotal;

    if(produtoId && quantidade && valorTotal){

        Compra.create({
            produtoId: produtoId,
            quantidade: quantidade,
            valorTotal: valorTotal
        }).then(() =>{
            res.redirect("/admin/compras");
        }).catch(error => {
            console.log("Erro ao salvar compra:", error);
            res.redirect("/admin/compras/new");
        });
    }else{
        res.redirect("/admin/compras/new");
    }

})



module.exports = router;