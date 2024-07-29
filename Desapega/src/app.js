import Express, { json, urlencoded } from "express";
import "dotenv/config";
import conn from "./configs/dbconfig.js";

const PORT = process.env.PORT;
const app = Express();

import './models/userModels.js';

import userRoutes from './routes/userRoutes.js'

app.use(urlencoded({extended:true}))
app.use(json());    

app.use('/users', userRoutes)

app.use('*', (req, res) => {
    res.status(404).json("Rota não encontrada!");
    res.end();
})

app.listen(PORT, () => {
    console.log("Server Open on Port "+ PORT);
})