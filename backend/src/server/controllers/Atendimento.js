const { criarAtendente } = require('../services/Teams');
const { atualizarStatus } = require('../services/mudarStatus');
const { atualizarTeam } = require('../services/mudarTeams');
const { adicionarUsuario } = require('../services/userMensagem');
const { login } = require('../services/loginAtendente');
const { obterDadosUsuariosPorToken } = require('../services/getMensagens');
const { obterDadosAtendente } = require('../services/getInfoAtentende');

//Criar o Atendente
exports.Cadastro = (req, res) => {

    const dados = req.body;
    console.log(dados)
    try {
        criarAtendente(dados)
            .then(atendente => {
                return res.status(200).json({
                    status: 'sucesso',
                    response: atendente
                })
            }).catch(error => {
                return res.status(400).json({
                    status: 'erro',
                    response: error
                })
            })

    } catch (error) {
        return res.status(500).json({
            error: 'Servidor fora, tente novamente em instantes'
        })
    }

}

//Fazer login
exports.Login = (req, res) => {
    let usuario = req.body;
    try {
        login(usuario)
            .then(response => {
                if (response.status === 'true' || response.status === true) {
                    return res.status(200).json({
                        status: 'sucesso',
                        response: response
                    })
                } else if (response.status === false || response.status === 'false') {
                    return res.status(401).json({
                        status: 'erro',
                        response: "Não autorizado, usuário inexistente. Verifique os seus dados"
                    })
                }
            }).catch(error => {
                return res.status(401).json({
                    status: 'erro',
                    response: error
                })
                console.log(error)
            })
    } catch (error) {
        return res.status(500).json({
            erro: 'servidor fora, tente mais tarde'
        })
        console.log(error)
    }

}


//Mudar o status do atendente

exports.statusAtendente = (req, res) => {
    const status = req.body.status;
    const token = req.headers.authorization
    console.log(status)
    try {
        atualizarStatus(status, token)
            .then(atendente => {
                return res.status(200).json({
                    status: atendente
                })
            }).catch(error => {
                return res.status(400).json({
                    status: 'erro',
                    response: error
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Servidor fora, tente novamente em instantes'
        })
    }
}

//Mudar o atendente de fila

exports.teams = (req, res) => {
    const team = req.body.teams;
    const token = req.headers.authorization;
    try {
        atualizarTeam(team, token)
            .then(atendente => {
                return res.status(200).json({
                    status: atendente
                })
            }).catch(error => {
                return res.status(400).json({
                    status: 'erro',
                    response: error
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Servidor fora, tente novamente em instantes'
        })
    }
}

//Vincular usuario a atendente

exports.vinculaUsuario = (req, res) => {
    const dados = req.body
    try {
        adicionarUsuario(dados)
            .then(usuario => {
                return res.status(200).json({
                    status: usuario
                })
            }).catch(error => {
                console.log(error)
                return res.status(400).json({
                    status: 'erro',
                    response: error
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Servidor fora, tente novamente em instantes'
        })
    }
}


//Buscar mensagens do atendente

exports.searchMensagem = (req, res) => {
    const token = req.headers.authorization;
    try {
        obterDadosUsuariosPorToken(token)
            .then(response => {
                return res.status(200).json({
                    status: response
                })
            }).catch(error => {
                return res.status(400).json({
                    status: 'erro',
                    response: error
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Servidor fora, tente novamente em instantes'
        })
    }
}

//Obter dados usuario
exports.infoAtendente = async (req, res) => {
    const token = req.headers.authorization; // Use 'authorization' em minúsculas

    try {
        const result = await obterDadosAtendente(token);

        return res.status(200).json({
            status: result
        });
    } catch (error) {
        console.error('Erro no controlador:', error);

        return res.status(400).json({
            status: 'erro',
            response: error.message // Adicionando a mensagem de erro ao response
        });
    }
};