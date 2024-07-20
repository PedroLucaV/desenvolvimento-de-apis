import conn from "../config/dbconfig.js";

const funcionarioTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS funcionarios(
	id VARCHAR(60) PRIMARY KEY NOT NULL UNIQUE,
	nome VARCHAR (255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    data_contratacao DATE NOT NULL,
    salario DOUBLE(10,2) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

conn.query(funcionarioTable, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    console.log("Tabela Funcionarios criada com sucesso");
});