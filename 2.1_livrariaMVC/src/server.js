import 'dotenv/config';
import express, { json } from 'express';

const PORT = process.env.PORT;

import conn from './config/dbconfig.js';

import "./models/livroModel.js";
import "./models/funcionarioModel.js"
import './models/usuariosModel.js'
import './models/emprestimosModel.js'

import livroRoutes from './routes/livroRoutes.js';
import funcionariosRoutes from './routes/funcionariosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js'
import emprestimosRoutes from './routes/emprestimosRoutes.js'

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use("/livros", livroRoutes);
app.use("/funcionarios", funcionariosRoutes);
app.use("/clientes", clientesRoutes);
app.use('/emprestimos', emprestimosRoutes)

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})