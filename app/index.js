import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './src/main';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    // Connection to React App
    this.server.use(express.static(join(__dirname, 'client/build/')));
  }
  routes() {
    this.server.use('/api/v1', routes);
    this.server.get('/api/', (_, response) => {
      response.send({
        message: 'Bem-vindo à API. Acesse /v1 e siga as orientações',
      });
    });
  }
}

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;
let connectedToMongoDB;

console.log('Iniciando conexão ao MongoDB...');
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB = false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once('open', () => {
  connectedToMongoDB = true;
  console.log('Conectado ao MongoDB');
  /**
   * Definição de porta e
   * inicialização do app
   */
  const PORT = process.env.PORT || 3001;
  new App().server.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  });
});
