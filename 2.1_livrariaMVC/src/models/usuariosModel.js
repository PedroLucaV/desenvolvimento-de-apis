import conn from "../config/dbconfig.js";

const clienteTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS clientes(
	id VARCHAR(60) PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    imagem VARCHAR(300) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

conn.query(clienteTable, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    console.log("Tabela clientes criada com sucesso");
});