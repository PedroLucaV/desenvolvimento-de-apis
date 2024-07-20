import conn from "../config/dbconfig.js";

const livroTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS livros(
	id VARCHAR(60) PRIMARY KEY NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    ano_publicacao YEAR(4) NOT NULL,
    genero VARCHAR(255) NOT NULL,
    preco DOUBLE(10, 2) NOT NULL,
    disponibilidade BOOLEAN DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

conn.query(livroTable, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    console.log("Tabela livros criada com sucesso");
});