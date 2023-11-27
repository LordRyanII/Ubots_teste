const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome: {
        type: String
    },
    texto: {
        type: String
    },
    teams: {
        type: String,
    }
})//  { _id: false }); // Adicione esta opção

const atendenteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    status: {
        type: String,
    },
    teams: {
        type: String,
        required: true
    },
    user: [{
        type: userSchema 
    }]
});

const User = mongoose.model('user', userSchema);
const Atendente = mongoose.model('atendentes', atendenteSchema);

module.exports = { Atendente, User }; // Use chaves para exportar um objeto

