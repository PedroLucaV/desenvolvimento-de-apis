import express, { json } from "express";
const PORT = 3333;

const app = express();

//aceitar dados JSON
app.use(express.json());

//Query params
app.get("/users", (req, res) => { //trabalhando com as querys params
    // const query = req.query;
    // console.log(query)
    const {nome, idade} = req.query; //desestruturando o objeto do query
    console.log(nome, idade);
    res.status(200).json([
        "pessoa 1",
        "pessoa 2",
        "pessoa 3"
    ])
});

//Body params
app.post("/users", (req, res) => {
    const {nome, idade} = req.body; //requisição do corpo desestruturada
    console.log(nome, idade);
    res.status(201).json([
        "pessoa 1",
        "pessoa 2",
        "pessoa 3",
        "pessoa 4"
    ])
});

//Route params
app.put("/users/:id/:cpf", (req, res) => {
    // const id = req.params.id; //podemos pegar dessa forma
    // const cpf = req.params.cpf //e tambem podemos pegar multiplos parametros de rota
    //quanto podemos desestruturar
    const {id, cpf} = req.params;
    console.log(id, cpf) 
    res.status(200).json([
        "pessoa 1",
        "pessoa 10",
        "pessoa 3",
        "pessoa 4"
    ])
});

app.delete("/users", (req, res) => {
    res.status(204).json([
        "pessoa 10",
        "pessoa 3",
        "pessoa 4"
    ])
});

app.listen(PORT, () => {
    console.log("Servidor on port "+PORT);
});