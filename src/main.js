import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function startApolloServer() {
  const app = express();

  app.get('/api/', (_, res) => {
    res.send({
      message: 'Bem-vindo à API.',
    });
  });

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({
    path: '/api/graphql',
    app,
    cors: {
      origin: 'http://localhost:3000',
    },
    bodyParserConfig: true,
  });

  app.use(express.static(path.join(__dirname, '../client/build/')));

  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
  await new Promise((resolve) => app.listen(PORT, resolve));

  console.log(`Server running at port: ${PORT}`);
  console.log(`Server ready at http://localhost:8000${server.graphqlPath}`);

  return { server, app };
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

  startApolloServer();
});
