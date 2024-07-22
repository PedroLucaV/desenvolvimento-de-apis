import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from "uuid";

export const pegarFuncionarios = (req, res) => {
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
};

export const criarFuncionario = (req, res) => {
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
    WHERE ?? = ?
    `;
    const validateEmail = ["email", email];

    conn.query(checkSql, validateEmail, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao cadastrar o funcionario!"});
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(404).json({message: "2 funcionarios não podem ter o mesmo email!"});
        }
        const id = uuidv4();
        const addFuncionario = /*sql*/ `
        INSERT INTO funcionarios(??, ??, ??, ??, ??, ??)
        VALUES(?, ?, ?, ?, ?, ?)
        `;
        const insertSql = ["funcionario_id", "nome", "cargo", "data_contratacao", "salario", "email",id, nome, cargo, data_contratacao, salario, email];

        conn.query(addFuncionario, insertSql, (err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o funcionario!"});
                return console.error(err);
            }
            res.status(201).json({message:`Funcionario ${nome} foi cadastrado com sucesso!`});
        })
    });
}

export const editarFuncionario = (req, res) => {
    const {id} = req.params;
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
    WHERE ?? = ?
    `;
    const checkId = ["funcionario_id", id];

    conn.query(checkSql,checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum funcionario com este ID!"});
        }

        const checkEmail = /*sql*/ `
        SELECT * FROM funcionarios
        `;

        conn.query(checkEmail, (err, data) => {
            if(err){
                res.status(500).json({message: "Erro ao buscar os dados!"});
                return console.error(err);
            }

            const index = data.findIndex(funcionario => funcionario.id == id)
            data.splice(index, 1)

            if(data.filter(funcionario => funcionario.email == email).length > 0){
                return res.status(403).json({message: "Já existe um usuario com este email!"})
            }

            const updateSQL = /*sql*/ `
            UPDATE funcionarios
            SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?
            WHERE ?? = ?
            `;
            const upQuery = ["nome", nome, "cargo", cargo, "data_contratacao", data_contratacao, "salario", salario, "email", email, "funcionario_id", id]

            conn.query(updateSQL, upQuery, (err) => {
                if(err){
                    res.status(500).json({message: "erro ao atualizar o funcionario"})
                    return console.error(err);
                }
                res.status(200).json({message: `O funcionario ${nome} foi atualizado com sucesso!`});
                res.end()
            })
        })
        
    })
}

export const deletarFuncionario = (req, res) => {
    const {id} = req.params;
    
    const deleteSQL = /*sql*/ `
    DELETE FROM funcionarios
    WHERE ?? = ?
    `

    const deleteSQlVal = ["funcionario_id", id];

    conn.query(deleteSQL, deleteSQlVal, (err, info) => {
        if(err){
            res.status(500).json({message: "erro ao deletetar o livro"})
            return console.error(err);
        }
        if(info.affectedRows == 0){
            res.status(404).json({message: "Funcionario não encontrado na base de dados"})
            return;
        }
        res.status(204);
        res.end()
    })
}

export const pegarFuncionarioPorId = (req, res) => {
    const {id} = req.params;

    const checkSql = /*sql*/ `
    SELECT * FROM funcionarios
    WHERE ?? = ?
    `;

    const valiSql = ["funcionario_id", id];
    
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: `Erro ao buscar os dados!`});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum funcionario com este ID!"});
        }

        const funcionario = data;
        res.status(200).json(funcionario);
        res.end();
    })
}