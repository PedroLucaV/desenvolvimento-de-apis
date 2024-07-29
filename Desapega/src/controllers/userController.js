import conn from "../configs/dbconfig.js";
import { v4 as uuidv4 } from 'uuid';

export const registerUser = (req, res) => {
    let {nome, email, telefone, senha, imagem} = req.body;

    if(!nome){
        return res.status(400).json('O campo nome não pode ser vazio');
    }
    if(!email){
        return res.status(400).json('O campo email não pode ser vazio');
    }
    if(!senha){
        return res.status(400).json('O campo senha não pode ser vazio');
    }
    if(!telefone){
        return res.status(400).json('O campo telefone não pode ser vazio');
    }
    if(!imagem){
        imagem = '/image/default.png'
    }

    const validateSql = /*sql*/ `
        SELECT * FROM users
        WHERE ?? = ?
    `
    const checkVal = ["email", email];

    conn.query(validateSql, checkVal, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro na criação!")
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(400).json('Já existe um usuario com este email!');
        }

        const id = uuidv4();
        const createUser = /*sql*/ `
            INSERT INTO users(??, ??, ??, ??, ??, ??)
            VALUES(?, ?, ?, ?, ?, ?)
        `
        const dataValues = ["id", "nome", "email", "telefone", "senha", "imagem", id, nome, email, telefone, senha, imagem];
        conn.query(createUser, dataValues, (err) => {
            if(err){
                res.status(500).json("Ocorreu um erro na busca!")
                return console.error(err);
            }

            res.status(201).json("Usuario criado!");
        })
    })
}

export const listUser = (req, res) => {
    const select = /*sql*/ `
        SELECT * FROM users;
    `

    conn.query(select, (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro na busca!")
            return console.error(err);
        }

        res.status(200).json(data);
    })
}