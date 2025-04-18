//para definir rotas em um arquivo diferente do arquivo principal utilizamos uma função do express chamada express.Router
//permite que crie rotas sem utilizar a variavel app
const express = require("express");
const router = express.Router();
const Produto = require("../produtos/Produto");
const Marca = require("../marcas/Marca");
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

//rotas para visualizar produtos sem login
router.get("/produtos", (req, res) => {
    //buscando todos os produtos e exibindo
    Produto.findAll({
        include:[{model: Marca}]
    }).then(produtos =>{
        res.render("produtos", {produtos:produtos})
    })
});


//rota para criar novo produto
router.get("/admin/produtos/new", adminAuth,(req, res) =>{
    Marca.findAll().then(marca => {
        res.render("admin/produtos/new", {marca: marca});
    })
    
})

//rota para salvar nova marca no banco
router.post("/produtos/save", (req, res) => {

    var name = req.body.name;
    var description = req.body.description;
    var value = req.body.value;
    var marca = req.body.marca;

    if(name != undefined){

        Produto.create({
            name: name,
            description: description,
            value: value,
            slug: slugify(name),
            marcaId: marca
        }).then(() =>{
            res.redirect("/admin/produtos");
        })
    }else{
        res.redirect("/admin/produtos/new");
    }

})

//rotas para visualizar produtos ADMIN
router.get("/admin/produtos", adminAuth, (req, res) => {
    //buscando todos os produtos e exibindo
    Produto.findAll({
        include:[{model: Marca}]
    }).then(produtos =>{
        res.render("admin/produtos/index", {produtos:produtos})
    })
});

//delete de produtos
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
            console.log("Erro ao deletar Produto:", error);
            res.redirect("/admin/produtos");
        });
    } else {
        res.redirect("/admin/produtos");
    }
});



//EDIT de produtos
router.get("/admin/produtos/edit/:id", adminAuth, (req, res) =>{
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


//Rota para atualizar produtos
router.post("/produtos/update", (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var description = req.body.description;
    var value = req.body.value;
    var estoque = req.body.estoque;

    //Atualizando produto que tenha o id
    Produto.update({name: name, description: description, value: value, slug:slugify(name), estoque: estoque,},{
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/produtos")
    })
})

module.exports = router;