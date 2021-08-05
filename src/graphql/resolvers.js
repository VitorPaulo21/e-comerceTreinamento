import { resolvers as nodeResolvers } from './Node/Node';
import { resolvers as listResolvers } from './List/List';
import { resolvers as itemResolvers } from './Item/Item';

const resolvers = {
  ...nodeResolvers,
  ...listResolvers,
  ...itemResolvers,
  Query: {
    hello: () => 'Hello world!',
    ...itemResolvers.Query,
  },
  Mutation: {
    ...itemResolvers.Query,
  },
};

export default resolvers;
