import conn from "../configs/dbconfig.js";

export const listarLinhas = (req, res) => {
    const listarSQL = /*sql*/ `
        SELECT * FROM linhas;
    `;
    conn.query(listarSQL, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        const linhas = data;
        res.status(200).json(linhas);
        res.end();
    })
}

export const criarLinha = (req, res) => {
    const {nome_linha, numero_linha, itinerario} = req.body;

    if(!nome_linha){
        return res.status(400).json({message: "O Campo nome_linha não pode estar vazio"})
    }

    if(!numero_linha){
        return res.status(400).json({message: "O Campo numero_linha não pode estar vazio"})
    }

    if(!itinerario){
        return res.status(400).json({message: "O Campo itinerario não pode estar vazio"})
    }

    const validateSQL = /*sql*/ `
        SELECT * FROM linhas
        WHERE ?? = ?
        OR ?? = ?
        ;
    `;
    const validateSQLParams = ["nome_linha", nome_linha, "numero_linha", numero_linha]
    conn.query(validateSQL, validateSQLParams, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao cadastrar a rota"});
            return console.error(err)
        }
        if(data.length > 0){
            return res.status(404).json({message: "Esta rota já existe!"});
        }

        const postRoute = /*sql*/ `
            INSERT INTO linhas(??, ??, ??)
            VALUES (?, ?, ?)
            ;
        `;

        const postRouteParams = ["nome_linha", "numero_linha", "itinerario", nome_linha, numero_linha, itinerario];

        conn.query(postRoute, postRouteParams, (err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar a linha!"});
                return console.error(err);
            }
            res.status(201).json({message:`A linha: ${nome_linha} foi cadastrado com sucesso!`});
        })
    })
}

export const listarLinhaId = (req, res) => {
    const {id} = req.params;

    const checkSql = /*sql*/ `
    SELECT * FROM linhas
    WHERE ?? = ?
    `;

    const valiSql = ["linha_id", id];
    
    conn.query(checkSql, valiSql, (err, data) => {
        if(err){
            res.status(500).json({message: `Erro ao buscar os dados!`});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhuma linha com este ID!"});
        }

        const linha = data;
        res.status(200).json(linha);
        res.end();
    })
}

export const editarLinha = (req, res) => {
    let {id} = req.params;
    let {nome_linha, numero_linha, itinerario} = req.body;

    if(!nome_linha && !numero_linha && !itinerario){
        return res.status(400).json({message: "Você deve passar algum dado a ser modificado: nome_linha, numero_linha ou itinerario!"});
    }

    const checkSql = /*sql*/ `
        SELECT ??, ?? FROM linhas
        INNER JOIN onibus ON linhas.?? = onibus.??
        WHERE ?? = ?;
    `;
    const checkId = ["onibus_id", "id_linha", "linha_id", "id_linha", "onibus_id", id];

    conn.query(checkSql, checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        if(data.length == 0){
            return res.status(404).json({message: "Não foi encontrado nenhum funcionario com este ID!"});
        }

        id = data[0].id_linha

        const checkData = /*sql*/ `
            SELECT * FROM linhas;
        `;

        const checkNum = ["numero_linha", numero_linha];

        conn.query(checkData, checkNum, (err, data) => {
            if(err){
                res.status(500).json({message: "Erro ao buscar os dados!"});
                return console.error(err);
            }
            const index = data.findIndex(linha => linha.linha_id == id)
            data.splice(index, 1)
    
            if(data.filter(linha => linha.numero_linha == numero_linha).length > 0){
                return res.status(404).json({message: "Já existe uma linha com este número!"});
            }

            const updateSQL = /*sql*/ `
                UPDATE linhas
                SET ?? = ?, ?? = ?, ?? = ?
                WHERE ?? = ?
            `

            if(!nome_linha){
                nome_linha = data[0].nome_linha
            }
            if(!numero_linha){
                numero_linha = data[0].numero_linha
            }
            if(!itinerario){
                itinerario = data[0].itinerario
            }

            const updateParams = ["nome_linha", nome_linha, "numero_linha", numero_linha, "itinerario", itinerario, "linha_id", id];

            conn.query(updateSQL, updateParams, (err) => {
                if(err){
                    res.status(500).json({message: "erro ao atualizar a linha"})
                    return console.error(err);
                }
                res.status(200).json({message: `A Linha ${nome_linha} foi atualizada com sucesso!`});
                res.end()
            })
        })
    })
}