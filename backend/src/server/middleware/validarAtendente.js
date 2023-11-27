const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const validarAtendente = (req, res, next) => {
  const { nome, email, senha, teams } = req.body;

  const emailAtendente = email.toLocaleLowerCase();
  const timeVendas = teams.toLocaleLowerCase();

  if (nome === '' || emailAtendente === '' || timeVendas === '' || senha === '') {
    return res.status(400).json({
      error: 'Por favor, preencha todos os campos'
    })
  } else if (emailAtendente.includes('@') && emailAtendente.includes('.com')) {
    if (timeVendas === 'cartoes' || timeVendas === 'emprestimos' || timeVendas === 'outros assuntos') {
      return next();
    } else {
      return res.status(400).json({
        error: "O campo de time deve ser cartões, empréstimos ou outros assuntos"
      })
      
    }
  } else {
    return res.status(400).json({
      error: 'Verifique os dados, há dados com informações erradas'
    });
  }
};

module.exports = validarAtendente;