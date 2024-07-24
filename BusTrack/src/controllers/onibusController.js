import conn from "../configs/dbconfig.js";

export const listarOnibus = (req, res) => {
    const listarSQL = /*sql*/ `
        SELECT * FROM onibus;
    `;
    conn.query(listarSQL, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        const dataMotorista = /*sql*/ `
            SELECT * FROM motoristas
            WHERE ?? = ?
        `
        let onibus = data;
        const validarMoto = ["motorista_id", data[0].id_motorista]
        conn.query(dataMotorista, validarMoto, (err, data) => {
            if(err){
                res.status(500).json({message: `Erro ao buscar os dados!`});
                return console.error(err);
            }
    
            if(data.length == 0){
                return res.status(404).json({message: "Não foi encontrado nenhum onibus com este ID!"});
            }

            const motorista = data[0]
            onibus.forEach(onibu => onibu.motorista = motorista)

            const dataLinha = /*sql*/ `
                SELECT * FROM linhas
                WHERE ?? = ?
            `

            const validarLinha = ["linha_id", onibus[0].id_linha]
            conn.query(dataLinha, validarLinha, (err, data) => {
                if(err){
                    res.status(500).json({message: `Erro ao buscar os dados!`});
                    return console.error(err);
                }
            
                if(data.length == 0){
                    return res.status(404).json({message: "Não foi encontrado nenhuma linha com este ID!"});
                }
            
                const linha = data[0]
                onibus.forEach(onibu => onibu.linha = linha)
                res.status(200).json(onibus);
            res.end();
            })
        })
    })
}

export const criarOnibus = (req, res) => {
    const {placa, modelo, ano_fabricacao, capacidade, id_linha, id_motorista} = req.body;

    if(!placa){
        return res.status(400).json({message: "O Campo placa não pode estar vazio"})
    }

    if(!modelo){
        return res.status(400).json({message: "O Campo modelo não pode estar vazio"})
    }

    if(!ano_fabricacao){
        return res.status(400).json({message: "O Campo ano_fabricacao não pode estar vazio"})
    }

    if(!capacidade){
        return res.status(400).json({message: "O Campo capacidade não pode estar vazio"})
    }

    if(!id_linha){
        return res.status(400).json({message: "O Campo ano_fabricacao não pode estar vazio"})
    }

    if(!id_motorista){
        return res.status(400).json({message: "O Campo id_motorista não pode estar vazio"})
    }

    const validateSQL = /*sql*/ `
        SELECT * FROM onibus
        WHERE ?? = ?
        ;
    `;
    const validateSQLParams = ["placa", placa]
    conn.query(validateSQL, validateSQLParams, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao cadastrar o motorista"});
            return console.error(err)
        }
        if(data.length > 0){
            return res.status(404).json({message: "Este onibus já existe!"});
        }

        const postRoute = /*sql*/ `
            INSERT INTO onibus(??, ??, ??, ??, ??, ??)
            VALUES (?, ?, ?, ?, ?, ?)
            ;
        `;

        const postRouteParams = ["placa", "ano_fabricacao", "capacidade", "modelo","id_linha","id_motorista", placa, ano_fabricacao, capacidade, modelo, id_linha, id_motorista];

        conn.query(postRoute, postRouteParams, (err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o onibus!"});
                return console.error(err);
            }
            res.status(201).json({message:`O onibus de placa: ${placa} foi cadastrado com sucesso!`});
        })
    })
}

export const listarOnibusPorId = (req, res) => {
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

        const dataMotorista = /*sql*/ `
            SELECT * FROM motoristas
            WHERE ?? = ?
        `
        let onibus = data;
        const validarMoto = ["motorista_id", data[0].id_motorista]
        conn.query(dataMotorista, validarMoto, (err, data) => {
            if(err){
                res.status(500).json({message: `Erro ao buscar os dados!`});
                return console.error(err);
            }
    
            if(data.length == 0){
                return res.status(404).json({message: "Não foi encontrado nenhum onibus com este ID!"});
            }

            const motorista = data[0]
            onibus[0].motorista = motorista;

            const dataLinha = /*sql*/ `
                SELECT * FROM linhas
                WHERE ?? = ?
            `

            const validarLinha = ["linha_id", onibus[0].id_linha]
            conn.query(dataLinha, validarLinha, (err, data) => {
                if(err){
                    res.status(500).json({message: `Erro ao buscar os dados!`});
                    return console.error(err);
                }
            
                if(data.length == 0){
                    return res.status(404).json({message: "Não foi encontrado nenhuma linha com este ID!"});
                }
            
                const linha = data[0]
                onibus[0].linha = linha;
                res.status(200).json(onibus);
            res.end();
            })
        })
    })
}