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
        INSERT INTO livros(??, ??, ??, ??, ??, ??)
        VALUES(?, ?, ?, ?, ?, ?)`;

        const dataInsert = ["livro_id", "titulo", "autor", "ano_publicacao", "genero", "preco", id, titulo, autor, ano_publicacao, genero, preco];

        conn.query(insertSQL, dataInsert, (err) => {
            if(err){
                res.status(500).json({message: "erro ao cadastrar o livro"})
                return console.error(err);
            }
            res.status(201).json({message: `O livro ${titulo} foi cadastrado!`});
        });
    })
}

export const editarLivro = (req, res) => {
    const {id} = req.params;
    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = req.body;

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
    if(disponibilidade == undefined){
        return res.status(400).json({message: "A disponibilidade não pode ser vazio"});
    }

    const checkSql = /*sql*/ `
    SELECT * FROM livros
    WHERE livro_id = "${id}"`;
    
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        if(data.length == 0){
            res.status(409).json({message: "Este livro não foi encontrado na base de dados!"});
            return;
        }
        const updateSQL = /*sql*/ `
        UPDATE livros
        SET titulo = "${titulo}", autor = "${autor}", ano_publicacao = "${ano_publicacao}", genero = "${genero}", preco = "${preco}", disponibilidade = "${disponibilidade}"
        WHERE livro_id = "${id}"
        `
        conn.query(updateSQL, (err) => {
            if(err){
                res.status(500).json({message: "erro ao deletetar o livro"})
                return console.error(err);
            }
            res.status(200).json({message: `Livro ${titulo} atualizado com sucesso!`});
            res.end()
        })
    });
}

export const deletarLivro = (req, res) => {
    const {id} = req.params;
    
    const deleteSQL = /*sql*/ `
    DELETE FROM livros
    WHERE livro_id = "${id}"
    `
    conn.query(deleteSQL, (err, info) => {
        if(err){
            res.status(500).json({message: "erro ao deletetar o livro"})
            return console.error(err);
        }
        if(info.affectedRows == 0){
            res.status(404).json({message: "Livro não encontrado na base de dados"})
            return;
        }
        res.status(204);
        res.end()
    })
}

export const pegarLivroPorId = (req, res) => {
    const {id} = req.params;
    
    const checkSql = /*sql*/ `
    SELECT * FROM livros
    WHERE livro_id = "${id}"`;
    
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        const buscaLivro = data.some(livro => livro.livro_id == id);
        if(buscaLivro == false){
            res.status(409).json({message: "Este livro não foi encontrado na base de dados!"});
            return;
        }
        const livro = data;
        res.status(200).json(livro);
    });
}

export const pegarLivroPorNome = (req, res) => {
    const nome = req.query.nome;
    // const nome = req.query.nome; //auto replace " " to %20 in web
    
    const checkSql = /*sql*/ `
    SELECT * FROM livros
    WHERE titulo like "${nome}%"`;
    
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        if(data.length == 0){
            res.status(409).json({message: "Este livro não foi encontrado na base de dados!"});
            return;
        }

        const livros = data;
        res.status(200).json(livros);
    });
}