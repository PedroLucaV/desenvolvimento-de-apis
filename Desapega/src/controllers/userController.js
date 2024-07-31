import conn from "../configs/dbconfig.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import createUserToken from "../helpers/createUserJWT.js";

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
};