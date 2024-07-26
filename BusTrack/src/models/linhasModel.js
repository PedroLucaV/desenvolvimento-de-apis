import conn from "../configs/dbconfig.js";

const linhasTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS linhas(
	linha_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome_linha VARCHAR (60) NOT NULL,
    numero_linha INT NOT NULL,
    itinerario VARCHAR(255) NOT NULL
    );`;

conn.query(linhasTable, (err, result) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela Linhas criada com sucesso");
});