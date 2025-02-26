//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();
const Marca = require("../marcas/Marca");
const slugify = require("slugify");

router.get("/marcas", (req, res) => {
    res.send("Rota de Marcas")
});

//rota para criar nova marca
router.get("/admin/marcas/new", (req, res) =>{
    res.render("admin/marcas/new")
})

//rota para o save no banco
router.post("/marcas/save", (req, res) =>{
    var name = req.body.name;
    if(name != undefined){

        Marca.create({
            name: name,
            slug: slugify(name)
        }).then(() =>{
            res.redirect("/");
        })

    }else{
        res.redirect("/admin/marcas/new");
    }
});

//rota para visualizar listagem de marcas
router.get("/admin/marcas", (req, res) => {

    Marca.findAll().then(marcas => {
        res.render("admin/marcas/index", {marcas: marcas})
    })
});


module.exports = router;