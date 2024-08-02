import jwt from 'jsonwebtoken';
import conn from '../configs/dbconfig.js';

const getUserByToken = async (token) => {
    return new Promise((resolve, reject) => {
        if(!token){
            return res.status(401),json({err: "Acesso Negado!"})
        }
        const decode = jwt.decode(token, 'SENHASEGURASSA')
        // console.log("Função Get User: ",decode);
        const userID = decode.id;

        const checkSQL = /*sql*/`
            SELECT * FROM users
            WHERE ?? = ?
        `
        const checkData = ['id_usuario', userID];

        conn.query(checkSQL, checkData, (err, data) => {
            if (err){
                reject({status: 500, message: "erro ao buscar usuario"});
            }
    
            if(data.length == 0) {
                reject({status: 404, message: "Usuario não encontrado"});
            }
    
            const usuario = data[0];
            resolve(usuario)
        })
    })
}

export default getUserByToken;