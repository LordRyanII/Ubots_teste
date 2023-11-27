const { Atendente } = require('../database/models/schemmaAtendentes');

const obterDadosUsuariosPorToken = async (token) => {
    try {
        console.log('Token retornado ' + token)
        // Encontrar o atendente pelo token
        const atendente = await Atendente.findOne({ 'token': token }).lean();

        console.log("Atendente Retornado " + atendente); // Adicione esta linha para depurar

        if (!atendente.user || atendente.user.length === 0) {
            return {
                error: 'Usuário não encontrado para o token fornecido ou dados de usuário ausentes'
            };
        }

        // Vamos assumir que você deseja obter os dados do primeiro usuário no array
        const dadosUsuarios = atendente.user;

        return {
            success: 'Dados dos usuários recuperados com sucesso',
            "response": [dadosUsuarios]
        };
    } catch (error) {
        console.error('Erro ao obter dados dos usuários:', error);
        return {
            error: 'Erro ao obter dados dos usuários'
        };
    }
};

module.exports = { obterDadosUsuariosPorToken };
