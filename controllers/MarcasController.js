//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();
const Marca = require("../marcas/Marca");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

//rota para visualizar listagem de marcas
router.get("/marcas", (req, res) => {
    //buscando por todas as marcas e exibindo
    Marca.findAll().then(marcas => {
        res.render("marcas", {marcas: marcas})
    })
});

//rota para criar nova marca
router.get("/admin/marcas/new", adminAuth, (req, res) =>{
    res.render("admin/marcas/new")
})

//rota para o salvar a nova marca banco
router.post("/marcas/save", (req, res) =>{
    var name = req.body.name;
    if(name != undefined){

        Marca.create({
            name: name,
            slug: slugify(name)
        }).then(() =>{
            res.redirect("/admin/marcas");
        })

    }else{
        res.redirect("/admin/marcas/new");
    }
});

//rota para visualizar listagem de marcas
router.get("/admin/marcas", adminAuth, (req, res) => {
    //buscando por todas as marcas e exibindo
    Marca.findAll().then(marcas => {
        res.render("admin/marcas/index", {marcas: marcas})
    })
});

//delete
router.post("/marcas/delete", (req, res) => {
    var id = req.body.id;

    // Verifica se o 'id' não está indefinido e se é um número (para garantir que seja um ID válido)
    if (id != undefined && !isNaN(id)) {
        
        // Utiliza o método destroy para deletar
        Marca.destroy({
            where: {
                id: id
            }
        })
        // Se a exclusão for bem-sucedida, executa o código dentro do 'then'
        .then(() => {
            res.redirect("/admin/marcas");
        })
        // Se houver um erro na exclusão
        .catch((error) => {
            console.log("Erro ao deletar marca:", error);
            res.redirect("/admin/marcas");
        });
    } else {
        res.redirect("/admin/marcas");
    }
});

router.get("/admin/marcas/edit/:id", adminAuth, (req, res) =>{
    var id = req.params.id;
    
    if(isNaN(id)){
    //verificando se id não é um numero
    res.redirect("/admin/marcas");
}
    Marca.findByPk(id).then(marca => {
        if(marca != undefined){
            //se a marca for achada
            res.render("admin/marcas/edit", {marca: marca})
        }else{
            res.redirect("/admin/marcas")
        }
    }).catch(erro => {
        res.redirect("/admin/marcas");
    })
});


router.post("/marcas/update", (req, res) =>{
    var id = req.body.id;
    var name = req.body.name;

    //atualizando titulo de uma categoria que tenha este ID
    Marca.update({name: name, slug:slugify(name)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/marcas");
    })
})

module.exports = router;