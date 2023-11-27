require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const rota = require('./routes/Principal');
const mongoSchemma = require('./database/config/connectionMongo');
const databaseMongo = new mongoSchemma(process.env.CLIENTEDATABASE);
const porta = 4005;

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use(rota);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(porta, () => {
    databaseMongo.connect()
    console.log('----------------------------------------------');
    console.log("Servidor iniciado na porta: " + porta);
    console.log('----------------------------------------------');
    console.log(`Endereço: http://localhost:${porta}`);
});
