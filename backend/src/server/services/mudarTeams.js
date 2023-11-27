const { Atendente } = require('../database/models/schemmaAtendentes');
const mongoose = require('mongoose');

const atualizarTeam = async (teams, token) => {
    try {
        const atendente = await Atendente.findOne({
            'token': token
        });

        if (!atendente) {
            return { error: 'Atendente não encontrado' };
        }

        // Verifica se houve mudança na fila
        if (atendente.teams !== teams) {
            // Remove atendimentos vinculados ao atendente
            atendente.user = [];
        }

        atendente.teams = teams;
        await atendente.save();

        return { success: 'Teams do atendente atualizado com sucesso' };
    } catch (error) {
        console.error('Erro ao atualizar o Teams do atendente:', error);
        return {
            status: 'Error',
            mensagem: 'Erro ao atualizar o Teams do atendente:',
            error
        };
    }
};

module.exports = { atualizarTeam };
