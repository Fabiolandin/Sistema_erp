//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();
const Produto = require("../produtos/Produto");
const adminAuth = require("../middlewares/adminAuth");
const Compra = require("../compras/Compra");

//Rota para visualizar compras COLOCAR NO ADMIN AUTH
router.get("/compras", (req, res) => {
    res.render("compras");
})


//Rota para criar nova compra
router.get("/admin/compras/new", (req, res) => {
    res.send("Rota de compras")
});