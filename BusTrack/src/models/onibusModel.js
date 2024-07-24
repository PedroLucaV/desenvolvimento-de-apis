import conn from "../configs/dbconfig.js";

const onibusTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS onibus(
	onibus_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	placa VARCHAR (8) NOT NULL,
    modelo VARCHAR (200) NOT NULL,
    ano_fabricacao YEAR NOT NULL,
    capacidade INT NOT NULL,
    id_linha INT NOT NULL,
    id_motorista INT NOT NULL,

    FOREIGN KEY (id_linha) REFERENCES linhas(linha_id),
    FOREIGN KEY (id_motorista) REFERENCES motorista(motorista_id)
    );`;

conn.query(onibusTable, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela Onibus criada com sucesso");
});