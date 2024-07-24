import conn from "../configs/dbconfig.js";

export const listarMotoristas = (req, res) => {
    const listarSQL = /*sql*/ `
        SELECT * FROM motoristas;
    `;
    conn.query(listarSQL, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        const motorsitas = data;
        res.status(200).json(motorsitas);
        res.end();
    })
}

export const criarMotorista = (req, res) => {
    const {nome, data_nascimento, numero_carteira_habilitacao} = req.body;

    if(!nome){
        return res.status(400).json({message: "O Campo nome não pode estar vazio"})
    }

    if(!data_nascimento){
        return res.status(400).json({message: "O Campo data_nascimento não pode estar vazio"})
    }

    if(!numero_carteira_habilitacao){
        return res.status(400).json({message: "O Campo numero_carteira_habilitacao não pode estar vazio"})
    }

    const validateSQL = /*sql*/ `
        SELECT * FROM motoristas
        WHERE ?? = ?
        ;
    `;
    const validateSQLParams = ["numero_carteira_habilitacao", numero_carteira_habilitacao]
    conn.query(validateSQL, validateSQLParams, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao cadastrar o motorista"});
            return console.error(err)
        }
        if(data.length > 0){
            return res.status(404).json({message: "Este motorista já existe!"});
        }

        const postRoute = /*sql*/ `
            INSERT INTO motoristas(??, ??, ??)
            VALUES (?, ?, ?)
            ;
        `;

        const postRouteParams = ["nome", "data_nascimento", "numero_carteira_habilitacao", nome, data_nascimento, numero_carteira_habilitacao];

        conn.query(postRoute, postRouteParams, (err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o motrista!"});
                return console.error(err);
            }
            res.status(201).json({message:`O motorista: ${nome} foi cadastrado com sucesso!`});
        })
    })
}

export const listarMotoristasPorId = (req, res) => {
    const {id} = req.params;

    const checkSql = /*sql*/ `
    SELECT * FROM onibus
    WHERE ?? = ?
    `;

    const valiSql = ["onibus_id", id];
    
    conn.query(checkSql, valiSql, (err, data) => {
        if(err){
            res.status(500).json({message: `Erro ao buscar os dados!`});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum onibus com este ID!"});
        }

        const idMotorista = data[0];

        const getById = /*sql*/ `
            SELECT * FROM motoristas
            WHERE ?? = ?
        `;
        const valiSql = ["motorista_id", id];

        conn.query(getById, valiSql, (err, data) => {
            if(err){
                res.status(500).json({message: `Erro ao buscar os dados!`});
                return console.error(err);
            }
    
            if(data.length == 0){
                return res.status(404).json({message: "Não foi encontrado nenhum motorista!"});
            }

            const motorista = data;
            res.status(200).json(motorista);
            res.end();
        })
    })
}

export const deletarMotorista = (req, res) => {
    const {id} = req.params;

    const checkSql = /*sql*/ `
    SELECT * FROM onibus
    WHERE ?? = ?
    `;

    const valiSql = ["onibus_id", id];
    
    conn.query(checkSql, valiSql, (err, data) => {
        if(err){
            res.status(500).json({message: `Erro ao buscar os dados!`});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum onibus com este ID!"});
        }

        const idMotorista = data[0];

        const getById = /*sql*/ `
            DELETE FROM motoristas
            WHERE ?? = ?
        `;
        const valiSql = ["motorista_id", id];

        conn.query(getById, valiSql, (err) => {
            if(err){
                res.status(500).json({message: `Erro ao buscar os dados!`});
                return console.error(err);
            }
    
            res.status(409)
            res.end();
        })
    })
}