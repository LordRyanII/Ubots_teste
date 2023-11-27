const express = require('express');
const router = express.Router();
const User = require('../controllers/Atendimento');
const validarAtendente = require('../middleware/validarAtendente');
const mudarStatus = require('../controllers/Atendimento');
const mudarTeams = require('../controllers/Atendimento');
const adicionarUsuario = require('../controllers/Atendimento');
const auth = require('../middleware/validarToken');
const mensagem = require('../controllers/Atendimento');
const info = require('../controllers/Atendimento');

router.use(express.json()); // Para JSON
router.use(express.urlencoded({ extended: true })); // Para URL-encoded

router.post('/invext/cadastro', validarAtendente, User.Cadastro); //Cadastro de usuário
router.post('/invext/login', User.Login);
router.put('/invext/status', auth.validarAcesso, mudarStatus.statusAtendente);
router.put('/invext/teams', auth.validarAcesso, mudarTeams.teams);
router.post('/invext/usuario/mensagem', adicionarUsuario.vinculaUsuario);
router.get('/invest/mensagens/vizualizar', auth.validarAcesso, mensagem.searchMensagem);
router.get('/invest/user/info', auth.validarAcesso, info.infoAtendente);

module.exports = router