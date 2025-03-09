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

//delete
router.post("/produtos/delete", (req, res) => {
    var id = req.body.id;
    // Verifica se o 'id' não está indefinido e se é um número (para garantir que seja um ID válido)
    if (id != undefined && !isNaN(id)) {
        
        // Utiliza o método destroy para deletar
        Produto.destroy({
            where: {
                id: id
            }
        })
        // Se a exclusão for bem-sucedida, executa o código dentro do 'then'
        .then(() => {
            res.redirect("/admin/produtos");
        })
        // Se houver um erro na exclusão
        .catch((error) => {
            console.log("Erro ao deletar marca:", error);
            res.redirect("/admin/produtos");
        });
    } else {
        res.redirect("/admin/produtos");
    }
});



//EDIT E UPDATE DE PRODUTOS

router.get("/admin/produtos/edit/:id", (req, res) =>{
    var id = req.params.id;

    if(isNaN(id)){
        //verificando se id não é um número
        res.redirect("/admin/produtos")
    }

    Produto.findByPk(id).then(produto => {
        if(produto != undefined){
            //se o produto for achado
            res.render("admin/produtos/edit", {produto: produto})
        }else{
            res.redirect("/admin/produtos")
        }
    }).catch(erro => {
        res.redirect("/admin/produtos")
    })
});

router.post("/produtos/update", (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var value = req.body.value;

    //Atualizando produto que tenha o id
    Produto.update({name: name, description: description, value: value, slug:slugify(name)},{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/produtos")
    })
})

module.exports = router;