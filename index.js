const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./database/database");

//configurando view ejs como view engine
app.set("view engine", "ejs");


//configurando body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//definindo arquivos statics
app.use(express.static('public'));


//chamando objeto de conexão DATABASE
connection
    .authenticate()
    .then(() =>{
        console.log("Conexão feita com sucesso!");
    }).catch((error) =>{
        console.log(error);
    })

//configurando rota principal como index.js
app.get("/", (req, res) => {
    res.render("index");
})

//rota cadastro
app.get("/cadastro", (req, res) => {
    res.render("cadastro");
})


app.listen(3000, () => {
    console.log("O servidor está rodando!")
})
