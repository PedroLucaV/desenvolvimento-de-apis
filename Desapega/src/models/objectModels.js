import conn from "../configs/dbconfig.js";

const ObjectModel = /*sql*/ `
    CREATE TABLE IF NOT EXISTS objects(
        id_object VARCHAR(60) NOT NULL PRIMARY KEY,
        titulo VARCHAR(255) NOT NULL,
        descricao VARCHAR(2500) NOT NULL,
        disponivel BOOLEAN NOT NULL,
        peso VARCHAR(255) NOT NULL,
        cor VARCHAR(60) NOT NULL,
        categoria VARCHAR(255) NOT NULL,
        user_id VARCHAR(60) NOT NULL,

        FOREIGN KEY(user_id) REFERENCES users(id_usuario),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(ObjectModel, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela objeto criada com sucesso");
});