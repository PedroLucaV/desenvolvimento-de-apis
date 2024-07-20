import 'dotenv/config';
import express, { json } from 'express';

const PORT = process.env.PORT;

import conn from './config/dbconfig.js';

import "./models/livroModel.js";
import "./models/funcionarioModel.js"

import livroRoutes from './routes/livroRoutes.js';

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use("/livros", livroRoutes);

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})