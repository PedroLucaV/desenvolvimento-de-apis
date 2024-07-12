import "dotenv/config";
import express, { json } from 'express';
import mysql2 from "mysql2";
import {v4 as uuidv4} from 'uuid';

const PORT = process.env.PORT;
const app = express();

app.use(json());

const conn = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password: process.env.DB_PASSWORD,
    database:'livraria',
    port:3306
});

conn.connect((err) => {
    if(err){
        return console.error(err.stack);
    }
    console.log("Mysql Conectado")
    app.listen(PORT, () => {
        console.log(`Servidor aberto na porta ${PORT}`)
    })
});

app.get("/livros", (req, res) =>{
    const sql = 'SELECT * FROM livros';
    conn.query(sql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        const livros = data;
        res.status(200).json(livros);
    })
})

app.post('/livros', (req, res) => {
    res.send("Cadastro")
})

//rota 404
app.use((req, res) => {
    res.status(404).json("Rota não encontrada"); //executa caso a rota não exista
})