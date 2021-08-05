
import { resolvers as nodeResolvers } from './Node/Node';

const resolvers = {
  ...nodeResolvers,

  Query: {
    hello: () => 'Hello world!',

  },
  Mutation: {
   
  },
};

export default resolvers;