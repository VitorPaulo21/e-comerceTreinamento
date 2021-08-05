import { gql } from 'apollo-server-express';

import { typeDefs as nodeTypeDefs } from './Node/Node';

const typeDefs = gql`
  type Query {
    _root: String
    hello: String
  }

  type Mutation {
    _root: String
  }

  ${nodeTypeDefs}
`;

export default typeDefs;
