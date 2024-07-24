import conn from "../configs/dbconfig.js";

const motoristaTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS motoristas(
	motorista_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	nome VARCHAR (255) NOT NULL,
    data_nascimento DATE NOT NULL,
    numero_carteira_habilitacao VARCHAR(255) NOT NULL
    );`;

conn.query(motoristaTable, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela Motoristas criada com sucesso");
});