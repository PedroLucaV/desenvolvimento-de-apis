import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from "uuid";

export const pegarLivros = (req, res) => {
    const selectSQL = /*sql*/`SELECT * FROM livros`
    conn.query(selectSQL, (err, data) => {
        if(err){
            return res.status(500).json({message: "erro ao buscar livros"});
        }

        const livros = data;
        res.status(200).json(livros);
    })
};

export const criarLivro = (req, res) => {
    const {titulo, autor, ano_publicacao, genero, preco} = req.body;

    if(!titulo){
        return res.status(400).json({message: "O titulo não pode ser vazio"});
    }
    if(!autor){
        return res.status(400).json({message: "O autor não pode ser vazio"});
    }
    if(!ano_publicacao){
        return res.status(400).json({message: "O ano de publicacao não pode ser vazio"});
    }
    if(!genero){
        return res.status(400).json({message: "O genero não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "O preco não pode ser vazio"});
    }
    
    const checkSql = /*sql*/ `
    SELECT * FROM livros 
    WHERE titulo = "${titulo}" 
    AND autor = "${autor}" 
    AND ano_publicacao = "${ano_publicacao}"`;
    
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        if(data.length > 0){
            res.status(409).json({message: "Livro já existe na base de dados"});
            return;
        }

        const id = uuidv4();
        const insertSQL = /*sql*/ `
        INSERT INTO livros(id, titulo, autor, ano_publicacao, genero, preco)
        VALUES("${id}", "${titulo}", "${autor}", "${ano_publicacao}", "${genero}", "${preco}")`;
        conn.query(insertSQL, (err) => {
            if(err){
                res.status(500).json({message: "erro ao cadastrar o livro"})
                return console.error(err);
            }
            res.status(201).json({message: `O livro ${titulo} foi cadastrado!`});
        });
    })
}