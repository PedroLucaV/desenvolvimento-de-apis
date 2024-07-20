import conn from "../config/dbconfig.js";

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