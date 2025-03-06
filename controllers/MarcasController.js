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
    //buscando por todas as marcas e exibindo
    Marca.findAll().then(marcas => {
        res.render("admin/marcas/index", {marcas: marcas})
    })
});

router.post("/marcas/delete", (req, res) => {
    var id = req.body.id;
    console.log("ID recebido para deletar:", id);

    // Verifica se o 'id' não está indefinido e se é um número (para garantir que seja um ID válido)
    if (id != undefined && !isNaN(id)) {
        
        // Utiliza o método destroy para deletar o registro da tabela "Marca" no banco de dados, onde o ID do registro é igual ao ID recebido
        Marca.destroy({
            where: {
                id: id
            }
        })
        // Se a exclusão for bem-sucedida, executa o código dentro do 'then'
        .then(() => {
            // Exibe no console uma mensagem indicando que a exclusão foi bem-sucedida
            console.log("Marca deletada com sucesso.");
            res.redirect("/admin/marcas");
        })
        // Se houver um erro na exclusão
        .catch((error) => {
            console.log("Erro ao deletar marca:", error);
            res.redirect("/admin/marcas");
        });
    } else {
        // Se o ID for indefinido ou não for um número, redireciona de volta para marcas
        res.redirect("/admin/marcas");
    }
});

router.get("/admin/marcas/edit/:id", (req, res) =>{
    var id = req.params.id;
    
    if(isNaN(id)){
    //verificando se id não é um numero
    res.redirect("/admin/marcas");
}
    Marca.findByPk(id).then(marca => {
        if(marca != undefined){
            //se a marca for achada
            res.render("admin/marcas/edit", {marcas: marcas})
        }else{
            res.redirect("/admin/marcas")
        }
    }).catch(err => {
        res.redirect("/admin/marcas");
    })
});

module.exports = router;