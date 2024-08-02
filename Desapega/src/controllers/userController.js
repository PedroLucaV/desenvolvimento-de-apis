import conn from "../configs/dbconfig.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import createUserToken from "../helpers/createUserJWT.js";
import getToken from "../helpers/getToken.js";
import jwt from 'jsonwebtoken';
import getUserByToken from '../helpers/getUserByToken.js'

export const registerUser = (req, res) => {
    const {nome, email, telefone, senha} = req.body;
    let {imagem} = req.body;
    if(!imagem){
        imagem = './images/default.png'
    }
    const validateSql = /*sql*/ `
        SELECT * FROM users
        WHERE ?? = ?
    `
    
    const checkVal = ["email", email];

    conn.query(validateSql, checkVal, async (err, data) => {
        if(err){
            res.status(500).json("Ocorreu um erro na criação!")
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(400).json('Já existe um usuario com este email!');
        }
        
        //criarSenha

        const salt = await bcrypt.genSalt(12);

        const senhaHash = await bcrypt.hash(senha, salt);
        const id = uuidv4();
        const createUser = /*sql*/ `
            INSERT INTO users(??, ??, ??, ??, ??, ??)
            VALUES(?, ?, ?, ?, ?, ?)
        `
        const dataValues = ["id_usuario", "nome", "email", "telefone", "senha", "imagem", id, nome, email, telefone, senhaHash, imagem];
        conn.query(createUser, dataValues, (err) => {
            if(err){
                res.status(500).json("Ocorreu um erro na criação!")
                return console.error(err);
            }
            
            const usuarioSQL = /*sql*/ `
                SELECT * FROM users
                WHERE ?? = ?
            `
            const userData = ['id_usuario', id];

            conn.query(usuarioSQL, userData, async (err, data) => {
                if(err){
                    res.status(500).json("Ocorreu um erro na busca!")
                    return console.error(err);
                }

                const usuario = data[0];

                try {
                    await createUserToken(usuario, req, res);
                }catch(error){
                    console.error(error)
                }
            })
        })
    })
}

export const loginUser = (req, res) => {
    const {email, senha} = req.body;

    //validações
    if(!email){
        res.status(400).json({message: "O email é obrigatorio!"})
    }
    if(!senha){
        res.status(400).json({message: "A senha é obrigatoria!"})
    }

    const checkSQL = /*sql*/ `
        SELECT * FROM users
        WHERE ?? = ?
    `
    const validate = ["email", email];

    conn.query(checkSQL, validate, async (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).json({message: "Erro ao buscar usuario"});
        }

        if(data.length == 0){
            return res.status(404).json({message: "usuario não encontrado"});
        }

        const usuario = data[0];

        const compararSenha = await bcrypt.compare(senha, usuario.senha);
        
        if(!compararSenha){
            return res.status(401).json({message: "A senha não condiz com o email!"});
        }

        try{
            await createUserToken(usuario, req, res);
        }catch(error){
            console.error(error)
            res.status(500).json({error: "Erro ao processar a informação"});
        }
    })
};

export const checkUser = (req, res) => {
    const {id} = req.params;
    let usuarioAtual;

    if(req.headers.authorization){
        const token = getToken(req);
        const decoder = jwt.decode(token, "SENHASEGURASSA");
        
        const usuarioId = decoder.id;

        if(usuarioId != id){
            return res.status(401).json({message: "Os dados não compreendem"});
        }
        const sql = /*sql*/ `
            SELECT * FROM users 
            WHERE ?? = ?
        `
        const data = ["id_usuario", usuarioId];
        conn.query(sql, data, (err, data) => {
            if(err){
                console.error(err);
                return res.status(500).json({error: "Erro ao verificar o usuario"})
            }

            usuarioAtual = data[0];
            res.status(200).json(usuarioAtual)
        })
    }else{
        usuarioAtual = null
        return res.status(200).json(usuarioAtual);
    }
}

export const getUserById = (req, res) => {
    const {id} = req.params;

    const checkSQL = /*sql*/ `
        SELECT id_usuario, nome, email, telefone, imagem
        FROM users
        WHERE ?? = ?
    `;

    const checkData = ['id_usuario', id];

    conn.query(checkSQL, checkData, (err, data) => {
        if (err){
            console.error(err)
            return res.status(500).json({message: "erro ao buscar os dados"});
        }

        if(data.length == 0) {
            res.status(404).json({message: "Usuario não encontrado"});
        }

        const usuario = data[0];
        res.status(200).json(usuario);
    })
}

export const editUser = async (req, res) => {
    const {id} = req.params;

    try{
        const token = getToken(req);
        const user = await getUserByToken(token);

        const {nome, email, telefone} = req.body;

        if(!nome){
            return res.status(400).json({message: "O Nome é obrigatorio!"});
        }

        if(!telefone){
            return res.status(400).json({message: "O Telefone é obrigatorio!"});
        }

        if(!email){
            return res.status(400).json({message: "O Email é obrigatorio!"});
        }

        const checkSQL = /*sql*/`
            SELECT * FROM users
            WHERE ?? = ?
        `
        const checkData = ['id_usuario', id];

        conn.query(checkSQL, checkData, (err, data) => {
            if(err){
                console.error(err)
                return res.status(500).json({err: "Erro ao localizar o usuario!"})
            }

            if(data.length == 0) {
                res.status(404).json({message: "usuario não encontrado"});
            }
    
            const usuario = data[0];

            const checkEmailSQL = /*sql*/ `
                SELECT * FROM users
                WHERE ?? = ? AND ?? != ?
            `
            const checkEmailData = ['email', email, 'id_usuario', id]

            conn.query(checkEmailSQL, checkEmailData, (err, data) => {
                if(err){
                    console.error(err)
                    return res.status(500).json({err: "Erro ao localizar o usuario!"})
                }
    
                if(data.length > 0) {
                    return res.status(404).json({message: "Já existe um usuario com este email!"});
                }

                const updateSQL = /*sql*/ `
                    UPDATE users
                    SET ? WHERE ?? = ?
                `
                const updateData = [{nome, email, telefone}, 'id_usuario', id];
                conn.query(updateSQL, updateData, (err) => {
                    if(err){
                        console.error(err)
                        return res.status(500).json({err: "Erro ao localizar o usuario!"})
                    }

                    res.status(200).json({message: "Usuario atualizado!"})
                })
            })
        })

    }catch(err){
        res.status(500).json({err: err})
    }
}