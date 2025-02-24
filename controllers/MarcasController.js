//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();

router.get("/marcas", (req, res) => {
    res.send("Rota de Marcas")
});

//rota para criar nova marca
router.get("/admin/marcas/new", (req, res) =>{
    res.send("Rota para criar nova categoria!")
})

module.exports = router;