function adminAuth(req, res, next) {
    console.log("Verificando sessão:", req.session.user);  // Verifique o estado da sessão aqui

    if (req.session.user != undefined) {
        next();
    } else {
        res.redirect("/login");  // Redirecione para a página de login se a sessão não existir
    }
}

module.exports = adminAuth;
