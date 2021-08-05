import { gql } from 'apollo-server-express';
import { typeDefs as nodeTypeDefs } from './Node/Node';
import { typeDefs as listTypeDefs } from './List/List';

const typeDefs = gql`
  type Money {
    value: Float!
  }
  type Query {
    _root: String
    hello: String
  }

  type Mutation {
    _root: String
  }

  ${nodeTypeDefs}
  ${listTypeDefs}
`;

export default typeDefs;
