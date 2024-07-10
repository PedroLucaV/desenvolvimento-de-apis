import "dotenv/config";
import express from 'express';
import mysql2 from "mysql2";
import {v4 as uuidv4} from 'uuid';

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) =>{
    res.send("Olá Mundo");
})

app.listen(PORT, () => {
    console.log(`Servidor aberto na porta ${PORT}`)
})