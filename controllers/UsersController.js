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

module.exports = router;