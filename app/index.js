import express from 'express';
import cors from 'cors';

import routes from './src/main';
import { join } from 'path';
import { config } from 'dotenv';

config();

const app = express();
app.use(cors());
app.use(express.json());

// /**
//  * Vinculando o React ao app
//  */
app.use(express.static(join(__dirname, 'client/build/')));

// /**
//  * Rota raiz
//  */
app.get('/api/', (_, response) => {
  response.send({
    message: 'Bem-vindo à API. Acesse /v1 e siga as orientações',
  });
});

/**
 * Rotas principais do app
 */
app.use('/api/v1', routes);

/**
 * Definição de porta e
 * inicialização do app
 */
const APP_PORT = process.env.PORT || 3001;
app.listen(APP_PORT, () => {
  console.log(`Servidor iniciado na porta ${APP_PORT}`);
});
