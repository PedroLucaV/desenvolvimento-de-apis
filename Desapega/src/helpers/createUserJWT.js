import jwt from 'jsonwebtoken';

const createUserToken = async (user, req, res) => {
    const token = jwt.sign(
        {
            nome: user.nome,
            id: user.id_usuario
        },
        "SENHASEGURASSA"
    )

    res.status(200).json({
        message: "Logado!",
        token,
        usuarioId: user.id_usuario
    })
}

export default createUserToken;