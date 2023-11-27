require('dotenv').config()
const jwt = require('jsonwebtoken');
const { Atendente } = require('../database/models/schemmaAtendentes');

exports.validarAcesso = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)

  if (!token) {
    return res.status(401).send({
      auth: false,
      message: 'Token não informado'
    });
  } else {
    try {
      //const decodedToken = jwt.verify(token, process.env.SECRETKEYTOKEN);
      const tokenAtendente = await Atendente.findOne({ token: token }).exec();

      if (tokenAtendente) {
        next();
      } else {
        return res.status(403).send({
          auth: false,
          message: 'Não autorizado'
        });
      }
    } catch (error) {
      return res.status(403).send({
        auth: false,
        message: 'Token inválido'
      });
    }
  }
};