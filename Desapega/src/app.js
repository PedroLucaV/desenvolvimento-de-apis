import Express from "express";
import conn from "./configs/dbconfig.js";
import "dotenv/config";

const PORT = 8080;
const app = Express();

app.listen(PORT, () => {
    console.log("Server Open on Port "+ PORT);
})