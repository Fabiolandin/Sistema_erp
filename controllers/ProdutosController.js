//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();

router.get("/produtos", (req, res) => {
    res.send("Rota de Produtos")
});

//rota para criar novo produto
router.get("/admin/protudos/new", (req, res) =>{
    res.send("Rota para criar novo Produto!")
})

module.exports = router;