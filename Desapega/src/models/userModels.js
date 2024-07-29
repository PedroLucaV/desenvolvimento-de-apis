import conn from "../configs/dbconfig.js";

const UserModel = /*sql*/ `
    CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(60) NOT NULL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        telefone VARCHAR(40) NOT NULL,
        senha VARCHAR(255) NOT NULL,
        imagem VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(UserModel, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela users criada com sucesso");
});