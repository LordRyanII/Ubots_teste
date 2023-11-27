const { Atendente } = require('../database/models/schemmaAtendentes');
const mongoose = require('mongoose');

const atualizarStatus = async (status, token) => {
    const tokenUser = token;
    console.log(status, token); // Corrigido para "status" em vez de "dados"
    try {
        const atendente = await Atendente.findOne({
            'token': tokenUser
        });

        if (!atendente) {
            return { error: 'Atendente não encontrado' };
        }

        atendente.status = status;
        await atendente.save();

        return { success: 'Status do atendente atualizado com sucesso' };
    } catch (error) {
        console.error('Erro ao atualizar o status do atendente:', error);
        return {
            status: 'Error',
            mensagem: 'Erro ao atualizar o status do atendente:',
            error
        };
    }
};

module.exports = { atualizarStatus };
