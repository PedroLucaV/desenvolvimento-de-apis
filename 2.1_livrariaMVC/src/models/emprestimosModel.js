import conn from "../config/dbconfig.js";

const emprestimoTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS emprestimos(
	emprestimo_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    clienteId VARCHAR(60) NOT NULL,
    livroId VARCHAR(60) NOT NULL,
    
    FOREIGN KEY (clienteId) REFERENCES clientes(cliente_id),
    FOREIGN KEY (livroId) REFERENCES livros(livro_id)
    );`;

conn.query(emprestimoTable, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    console.log("Tabela Emprestimos criada com sucesso");
});