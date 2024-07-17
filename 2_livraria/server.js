import "dotenv/config";
import express, { json } from 'express';
import mysql2 from "mysql2";
import {v4 as uuidv4} from 'uuid';

const PORT = process.env.PORT;
const app = express();

app.use(json());

const conn = mysql2.createConnection({
    host:'localhost',
    user:'root',
    password: process.env.DB_PASSWORD,
    database:'livraria',
    port:3306
});

conn.connect((err) => {
    if(err){
        return console.error(err.stack);
    }
    console.log("Mysql Conectado")
    app.listen(PORT, () => {
        console.log(`Servidor aberto na porta ${PORT}`)
    })
});

app.get("/livros", (req, res) =>{
    const sql = /*sql*/ `SELECT * FROM livros`;

    conn.query(sql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        const livros = data;
        res.status(200).json(livros);
    })
})

app.post('/livros', (req, res) => {
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
})

app.delete("/livro/:id", (req, res) => {
    const {id} = req.params;
    
    const deleteSQL = /*sql*/ `
    DELETE FROM livros
    WHERE id = "${id}"
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
})

app.put("/livro/:id",(req, res) => {
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
    WHERE id = "${id}"`;
    
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
        WHERE id = "${id}"
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
})

app.get('/livro/:id', (req, res) => {
    const {id} = req.params;
    
    const checkSql = /*sql*/ `
    SELECT * FROM livros
    WHERE id = "${id}"`;
    
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        const buscaLivro = data.some(livro => livro.id == id);
        if(buscaLivro == false){
            res.status(409).json({message: "Este livro não foi encontrado na base de dados!"});
            return;
        }
        const livro = data;
        res.status(200).json(livro);
    });
})

app.get('/livro', (req, res) => {
    const nome = req.query.nome.replace('+', ' ');
    // const nome = req.query.nome; //auto replace " " to %20 in web
    
    const checkSql = /*sql*/ `
    SELECT * FROM livros
    WHERE titulo like "${nome}%"`;
    
    conn.query(checkSql, (err, data) => {
        console.log(checkSql)
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
})

//rota funcionarios

app.get('/funcionarios', (req, res) => {
    const checkSql = /*sql*/ `
    SELECT * FROM funcionarios
    `;

    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        const funcionarios = data;
        res.status(200).json(funcionarios);
        res.end();
    })
}) //lista todos

app.post('/funcionario', (req, res) => {
    const {nome, cargo, data_contratacao, salario, email} = req.body;
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!cargo){
        return res.status(400).json({message: "O cargo não pode ser vazio"});
    }
    if(!data_contratacao){
        return res.status(400).json({message: "A data de contratação não pode ser vazia"});
    }
    if(!salario){
        return res.status(400).json({message: "O salario não pode ser vazio"});
    }
    if(!email){
        return res.status(400).json({message: "O preco não pode ser vazio"});
    }
    
    const checkSql = /*sql*/ `
    SELECT * FROM funcionarios
    WHERE email = "${email}"
    `;

    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(404).json({message: "2 funcionarios não podem ter o mesmo email!"});
        }
        const id = uuidv4();
        const addFuncionario = /*sql*/ `
        INSERT INTO funcionarios(id, nome, cargo, data_contratacao, salario, email)
        VALUES("${id}", "${nome}", "${cargo}", "${data_contratacao}", "${salario}", "${email}")
        `;

        conn.query(addFuncionario, (err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o funcionario!"});
                return console.error(err);
            }
            res.status(201).json({message:`Funcionario ${nome} foi cadastrado com sucesso!`});
        })
    });
}) //cadastra funcionario (email unico)

app.get('/funcionario/:id', (req, res) => {
    const {id} = req.params;

    const checkSql = /*sql*/ `
    SELECT * FROM funcionarios
    WHERE id = "${id}"
    `;

    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum funcionario com este ID!"});
        }

        const funcionarioo = data;
        res.status(200).json(funcionarioo);
        res.end();
    })
}) //listar 1 funcionario

app.put('/funcionario/:id') //atualizar 1 funcionario

app.delete('/funcionario/:id') //deletar 1 funcionario

//rota 404
app.use((req, res) => {
    res.status(404).json("Rota não encontrada"); //executa caso a rota não exista
})