import Express, { json, urlencoded } from "express";
import "dotenv/config";
import conn from "./configs/dbconfig.js";
import path from 'node:path';
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT;
const app = Express();

import './models/userModels.js';

import userRoutes from './routes/userRoutes.js'

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

app.use(urlencoded({extended:true}))
app.use(json());

app.use('/public', Express.static(path.join(__dirName) + 'public'));

app.use('/users', userRoutes)

app.use('*', (req, res) => {
    res.status(404).json("Rota não encontrada!");
    res.end();
})

app.listen(PORT, () => {
    console.log("Server Open on Port "+ PORT);
})