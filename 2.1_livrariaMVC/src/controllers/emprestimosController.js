import conn from "../config/dbconfig.js";
import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear.js'

dayjs.locale('pt-br')

export const listarEmprestimos = (req, res) => {
    const checkSql = /*sql*/ `
        SELECT * FROM emprestimos;
    `

    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        const empresitmos = data;
        res.status(200).json(empresitmos);
        res.end();
    })
}

export const criarEmprestimo = (req, res) => {
    let {data_emprestimo, data_devolucao, clienteId, livroId} = req.body;
    const now = dayjs().toDate();
    const diaHoje = dayjs().date()
    data_devolucao = dayjs(data_devolucao);
    data_emprestimo = dayjs(data_emprestimo);
    dayjs.extend(weekOfYear);

    if(!data_emprestimo){
        return res.status(400).json({message: "A data de empresitmo não pode ser vazia"});
    }
    if(!data_devolucao){
        return res.status(400).json({message: "A data de devolucao não pode ser vazia"});
    }
    if(!clienteId){
        return res.status(400).json({message: "O id do cliente não pode ser vazio"});
    }
    if(!livroId){
        return res.status(400).json({message: "O id do livro não pode ser vazio"});
    }

    if(data_emprestimo < now && data_emprestimo.date() != diaHoje){
        return res.status(409).json({message: "A data de emprestimo não pode ser antes da data atual!"});
    }

    if(data_devolucao < data_emprestimo){
        return res.status(409).json({message: "A data de devoluçao não pode ser antes da data de emprestimo!"});
    }

    if(data_devolucao.week() - data_emprestimo.week() > 2){
        return res.status(403).json({message: "A data de devolução não pode ser superior a 2 semanas após a data de emprestimo!"})
    }

    const insertSql = /*sql*/ `
        INSERT INTO emprestimos(??, ??, ??, ??)
        VALUES (?, ?, ?, ?)
    `;
    const datasToInsert = ["data_emprestimo", "data_devolucao", "clienteId", "livroId", data_emprestimo.toDate(), data_devolucao.toDate(), clienteId, livroId];
    conn.query(insertSql, datasToInsert, (err) => {
        if(err){
            res.status(500).json({message: "Erro ao criar o emprestimo!"});
            return console.error(err);
        }
        res.status(201).json({message:`O Emprestimo foi realizado!`});
    })
}