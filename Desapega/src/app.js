import Express, { json } from "express";
import "dotenv/config";
import conn from "./configs/dbconfig.js";


const PORT = process.env.PORT;
const app = Express();

app.use(json());

app.use('*', (req, res) => {
    res.status(404).json("Rota não encontrada!");
    res.end();
})

app.listen(PORT, () => {
    console.log("Server Open on Port "+ PORT);
})