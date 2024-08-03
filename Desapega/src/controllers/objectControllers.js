import getToken from "../helpers/getToken.js";
import getUserByToken from "../helpers/getUserByToken.js";
import { v4 as uuidv4 } from 'uuid';
import conn from "../configs/dbconfig.js";

export const createObject = async (req, res) => {
    const {titulo, descricao, peso, cor, categoria} = req.body;
    const disponivel = 1;

    const token = getToken(req);
    const user = await getUserByToken(token)

    if(!titulo){
        res.status(400).json({message: "O titulo é obrigatório"})
    }

    if(!descricao){
        res.status(400).json({message: "A descrição é obrigatória"})
    }

    if(!peso){
        res.status(400).json({message: "O peso é obrigatório"})
    }
    
    if(!cor){
        res.status(400).json({message: "A cor é obrigatória"})
    }

    if(!categoria){
        res.status(400).json({message: "A categoria é obrigatória"})
    }

    const objetoId = uuidv4();
    const user_id = user.id_usuario;
    const insertSQL = /*sql*/ `
        INSERT INTO objects (??, ??, ??, ??, ??, ??, ??, ??)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    const insertData = ['id_object', 'titulo', 'descricao', 'disponivel', 'peso', 'cor', 'categoria', 'user_id', objetoId, titulo, descricao, disponivel, peso, cor, categoria, user_id];

    conn.query(insertSQL, insertData, (err) => {
        if(err){
            console.error(err)
            return res.status(500).json({err: "Erro ao cadastrar o objeto!"})
        }

        if(req.files){
            //cadastrar
            const insertImage = /*sql*/ `
                INSERT INTO images (id_image, id_objeto, image_path)
                VALUES ?
            `
            const imageValues = req.files.map(file => [
                uuidv4(),
                objetoId,
                file.filename
            ])
            conn.query(insertImage, [imageValues], (err) => {
                if(err){
                    console.error(err)
                    return res
                    .status(500)
                    .json({err: "Erro ao cadastrar o objeto!"})
                }
                res
                .status(201)
                .json({
                    message: 'Objeto cadastrado com sucesso'
                })
            })
        }else{
            res
                .status(201)
                .json({
                    message: 'Objeto cadastrado com sucesso sem foto!'
                })
        }
    })
}

export const getAllObjectUser = async (req, res) => {
    try{
        const token = getToken(req);
        const user = getUserByToken(token)

        const usuarioId = user.id_usuario;
        const selectSQL = /*sql*/ `
            SELECT obj.id_object, obj.user_id, obj.titulo, obj.descricao, obj.peso, obj.cor,
            GROUP_CONCAT(obj_img.image_path SEPARATOR',') AS image_path
            FROM objects as obj
            LEFT JOIN images as obj_img ON obj.id_object = obj_img.id_objeto
            WHERE obj.user_id = ?
            GROUP BY obj.id_object, obj.user_id, obj.titulo, obj.descricao, obj.peso, obj.cor
        `
        conn.query(selectSQL, [usuarioId], (err, data) => {
            if(err){
                console.error(err)
                return res
                .status(500)
                .json({err: "Erro ao buscar o objeto!"})
            }
            console.log(data[0])
        })
    }catch (error){

    }
}