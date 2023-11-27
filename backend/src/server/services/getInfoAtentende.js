const { Atendente } = require('../database/models/schemmaAtendentes');

const obterDadosAtendente = async (token) => {
    try {
        // Encontrar o atendente pelo token
        const atendente = await Atendente.findOne({
            'token': token
        });

        if (!atendente) {
            return {
                error: 'Usuário não encontrado para o token fornecido'
            };
        }

        const dadosUsuarios = atendente;
        console.log(dadosUsuarios);

        return {
            success: 'Dados dos usuários recuperados com sucesso',
            dadosUsuarios
        };
    } catch (error) {
        console.error('Erro ao obter dados dos usuários:', error);
        return {
            error: `Erro ao obter dados dos usuários: ${error.message || 'Erro desconhecido'}`
        };
    }
};

module.exports = { obterDadosAtendente };
