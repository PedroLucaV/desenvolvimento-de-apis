import 'dotenv/config';
import express from 'express';

const PORT = process.env.PORT;

import conn from './config/dbconfig.js';

const app = express();

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})