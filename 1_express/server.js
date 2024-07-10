import express, { json } from "express";
import {v4 as uuidv4} from "uuid";
const PORT = 3333;

const app = express();

//aceitar dados JSON
app.use(express.json());

//Middleware
const logRoutes = (request, response, next) => {
    const {url, method} = request;
    const rota = `[${method.toUpperCase()}] ${url}`;

    console.log(rota)
    next();
};

app.use(logRoutes);

const users = [];
app.get("/users", (req, res) => {
    res.status(200);
    res.json(users);
});

app.post("/users", (req, res) => {
    const id = uuidv4();
    const {nome, idade} = req.body;
    if(!nome){
        res.status(400);
        res.json({message: "Está faltando o nome no campo"})
        return;
    } else if(!idade){
        res.status(400);
        res.json({message: "Está faltando a idade"})
        return;
    }
    const usuario = {id, nome, idade}
    users.push(usuario)
    res.status(201);
    res.json({message: "Usuario criado!", usuario});
    res.end();
});

app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const {nome, idade} = req.body;
    const indexUser = users.findIndex(usuario => usuario.id == id);
    if(indexUser == -1){
        res.status(404);
        res.json("Usuario não encontrado");
        return;
    }
    if(!nome || !idade){
        res.status(400);
        res.json("O corpo não pode estar vazio! Me informe o nome e a idade a ser trocada do usuario!")
        return;
    }
    const updatedUser = {id, nome, idade};
    users[indexUser] = updatedUser;
    res.status(200);
    res.json("Usuario atualizado!")
    res.end();
});

app.delete("/users/:id", (req, res) => {
    const {id} = req.params;
    const indexUser = users.findIndex(usuario => usuario.id == id);
    if(indexUser == -1){
        res.status(404);
        res.json("Usuario não encontrado");
        return;
    }
    users.splice(indexUser, 1);
    res.status(204);
    res.end();
});

app.listen(PORT, () => {
    console.log("Servidor on port "+PORT);
});