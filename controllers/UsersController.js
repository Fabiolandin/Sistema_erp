const express = require("express");
const router = express.Router();
const User = require("../users/User");

router.get("/admin/users", (req, res) => {
    res.send("Listagem de usuários")

});

router.get("/admin/users/create",(req, res) => {
    res.render("admin/users/create");
})

router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.email;
})

module.exports = router;