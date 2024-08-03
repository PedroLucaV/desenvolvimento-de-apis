import conn from "../configs/dbconfig.js";

const ImageModel = /*sql*/ `
    CREATE TABLE IF NOT EXISTS images(
        id_image VARCHAR(60) NOT NULL PRIMARY KEY,
        image_path  VARCHAR(255) NOT NULL,
        id_objeto VARCHAR(60) NOT NULL,
        FOREIGN KEY(id_objeto) REFERENCES objects(id_object),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;

conn.query(ImageModel, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    if(result.warningStatus > 0){
        return;
    }
    console.log("Tabela imagens criada com sucesso");
});