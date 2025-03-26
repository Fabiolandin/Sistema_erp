const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const session = require("express-session");
const connection = require("./database/database");

//importando controllers
const marcasController = require("./controllers/MarcasController");
const produtosController = require("./controllers/ProdutosController");
const usersController = require("./controllers/UsersController");
const compraController = require("./controllers/ComprasController");

const Produto = require("./produtos/Produto");
const Marca = require("./marcas/Marca");
const User = require("./users/User");
const Compra = require("./compras/Compra");

//configurando view ejs como view engine
app.set("view engine", "ejs");


//configurando sessões
app.use(session({
    secret: "textsecurity",
    resave: false,  // Impede que a sessão seja salva novamente se não houver modificações
    saveUninitialized: false,  // Impede que uma sessão vazia seja criada
    cookie: { 
        maxAge: 30000000,
        secure: false,  // Certifique-se de que está "false" se estiver em ambiente de desenvolvimento sem HTTPS
        httpOnly: true  // Para maior segurança, o cookie não será acessível no front-end
    }
}));


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

//dizendo para aplicação que quero utilizar as rotas que estão dentro desses imports
app.use("/", marcasController);
app.use("/", produtosController);
app.use("/", usersController);

//rota cadastro
app.get("/cadastro", (req, res) => {
    res.render("cadastro");
})


app.listen(3000, () => {
    console.log("O servidor está rodando!")
})
