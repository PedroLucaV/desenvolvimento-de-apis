import express from "express";
import "dotenv/config";
import conn from './configs/dbconfig.js';

const app = express();

const PORT = process.env.PORT;

import linhasRoutes from './routes/linhasRoutes.js'

import './models/motoristaModel.js'
import './models/linhasModel.js'
import './models/onibusModel.js'

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use('/linhas', linhasRoutes);

app.listen(PORT, () => {
    console.log(`Server open in port: ${PORT}`);
})

