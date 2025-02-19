//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();

router.get("/marcas", (req, res) => {
    res.send("Rota de Marcas")
});