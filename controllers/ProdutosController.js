//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();
const Produto = require("../produtos/Produto");
const slugify = require("slugify");

router.get("/produtos", (req, res) => {
    res.send("Rota de Produtos")
});

//rota para criar novo produto
router.get("/admin/produtos/new", (req, res) =>{
    res.render("admin/produtos/new");
})

//salvando produto no banco
router.post("/produtos/save", (req, res) => {
    var name = req.body.name;
    var description = req.body.description;
    var value = req.body.value;
    if(name != undefined){

        Produto.create({
            name: name,
            description: description,
            value: value,
            slug: slugify(name)
        }).then(() =>{
            res.redirect("/admin/produtos");
        })
    }else{
        res.redirect("/admin/produtos/new");
    }

})

//rotas para visualizar produtos
router.get("/admin/produtos", (req, res) => {
    //buscando todos os produtos e exibindo
    Produto.findAll().then(produtos =>{
        res.render("admin/produtos/index", {produtos:produtos})
    })
});

module.exports = router;