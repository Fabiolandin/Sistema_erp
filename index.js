var bodyParser = require("body-parser");
var express = require("express");
var app = express();

 

//configurando view ejs como view engine
app.set("view engine", "ejs");







//configurando rota principal como index.js
app.get("/", (req, res) => {
    res.render("index");
})



app.listen(3000, () => {
    console.log("O servidor está rodando!")
})
