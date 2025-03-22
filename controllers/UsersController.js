const express = require("express");
const router = express.Router();
const User = require("../users/User");
const bcrypt = require("bcryptjs");

//rota para listagem de users
router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users/index",{users: users});
    });

});

//rota para criação de usuarios
router.get("/admin/users/create",(req, res) => {
    res.render("admin/users/create");
})

//rota para criação de users
router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where: {email: email}}).then( user => {
        //se não tiver um email igual
        if(user == undefined){

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
        
            User.create({
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/");
            }).catch((err) => {
                res.redirect("/")
            })

        }else{
            //se tiver um email igual redireciona pra pagina de criação novamente
            res.redirect("/admin/users/create");
        }
    })

})

//criando rota de login
router.get("/login", (req, res) => {
    res.render("admin/users/login");
})

//rota para authenticação de login verificando se 
router.post("/authenticate", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    //email tem que ser igual email e se eu achar o usuario e for diferente de undefined
    User.findOne({where:{email: email}}).then(user => {
        if(user != undefined){//se existe usuario com este email
            //validar senha
            var correct = bcrypt.compareSync(password, user.password);

            if(correct){//se a senha esta correta!
                req.session.user = {
                    id: user.id,
                    email: user.email
                };
                console.log("Usuário autenticado:", req.session.user);  // Verifique se a sessão foi criada
                res.redirect("/admin/users")
                
            }else{
                //se não achar manda pra tela de login novamente!
            res.redirect("/login");
            }

        }else{
            //se não achar manda pra tela de login novamente!
            res.redirect("/login");
        }
    })

})

module.exports = router;