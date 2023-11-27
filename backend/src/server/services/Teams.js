require('dotenv').config();
const {  Atendente } = require('../database/models/schemmaAtendentes');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const criarAtendente = async (dados) => {
    console.log(dados);
    const { nome, email, senha ,teams  } = dados;

    const saltSenha = 10;
    const valorSenha = senha;
    const salt = bcrypt.genSaltSync(saltSenha);
    const hash = bcrypt.hashSync(valorSenha, salt);

    const token = jwt.sign({ email: email }, process.env.SECRETKEYTOKEN);

    const novoAtendente = new Atendente({
        nome: nome,
        email: email,
        senha: hash,
        token: token,
        status: 'Offline',
        teams: teams,
    });

    try {
        const leadSalvo = await novoAtendente.save();
        console.log('Atendente salvo com sucesso:', novoAtendente);

        // Buscar todos os atendentes do mesmo time
        const atendentesDoTime = await Atendente.find({ teams: teams });
        console.log('Atendentes do mesmo time:', atendentesDoTime);

        return {
            leadSalvo,
            atendentesDoTime
        };
    } catch (error) {
        console.error('Erro ao salvar novo Atendente:', error);
        return {
            status: 'Error',
            mensagem: 'Erro ao salvar novo Atendente:', error
        }
    }
};

module.exports = { criarAtendente };
