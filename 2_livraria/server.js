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
    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = req.body;
    if(!titulo){
        return res.status(400).json({message: "O titulo não pode ser vazio"});
    }
    if(!autor){
        return res.status(400).json({message: "O autor não pode ser vazio"});
    }
    if(!ano_publicacao){
        return res.status(400).json({message: "O ano de publicacao não pode ser vazio"});
    }
    if(!genero){
        return res.status(400).json({message: "O genero não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "O preco não pode ser vazio"});
    }
    if(!disponibilidade){
        return res.status(400).json({message: "A disponibilidade não pode ser vazio"});
    }
    
    const checkSql = `SELECT * FROM livros WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        if(data.length > 0){
            res.status(409).json({message: "Livro já existe na base de dados"});
            return;
        }
    })

})

//rota 404
app.use((req, res) => {
    res.status(404).json("Rota não encontrada"); //executa caso a rota não exista
})