const { Atendente, User } = require('../database/models/schemmaAtendentes');

const adicionarUsuario = async (dados) => {
    const { nome, texto, teams } = dados;
    console.log(dados);
    // Encontrar um atendente que está online e tem menos de 3 usuários
    const atendente = await Atendente.findOne({ teams, status: 'Online', $expr: { $lt: [{ $size: "$user" }, 3] } });

    if (!atendente) {
        return { error: 'Nenhum atendente disponível' };
    }
    const novoUsuario = new User({
        nome,
        texto,
        teams
    });

    try {
        const usuarioSalvo = await novoUsuario.save();

        atendente.user.push(usuarioSalvo);
        await atendente.save();

        return { success: 'Usuário adicionado com sucesso', usuario: usuarioSalvo };
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        return { error: 'Erro ao adicionar usuário' };
    }
};

module.exports = { adicionarUsuario };
