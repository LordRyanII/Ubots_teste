const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Atendente}  = require('../database/models/schemmaAtendentes');

const login = async (user) => {
    const {
        email,
        senha
    } = user;
    console.log('Usuario' + user)

    const atendente = await Atendente.findOne({
        email: email
    }).exec();
    console.log('Atendente encontrado' + atendente)

    if (atendente) {
        const senhaCorrespondente = bcrypt.compareSync(senha, atendente.senha);
        console.log(senhaCorrespondente)

        if (senhaCorrespondente) {
            // Senha corresponde ao hash
            const token = atendente.token; // Obtenha o token do registro do atendente
            console.log('Token' + token)
            return {
                status: true,
                message: 'Usuário logado com sucesso!',
                token: token
            };
        } else {
            // Senha não corresponde ao hash
            return {
                status: false,
                message: 'Senha incorreta'
            };
        }
    } else {
        // Usuário não encontrado
        return {
            status: false,
            message: 'Usuário não encontrado'
        };
    }
};

module.exports = {
    login
};