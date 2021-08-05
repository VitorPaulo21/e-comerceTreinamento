import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Item implements Node {
    id: ID!
    name: String!
    brand: String!
    type: String!
    unit_amount: Money!
    description: String!
    category: String!
    rating: Float!
  }
  type ItemList implements List {
    itens: [Item!]!
    totalItens: Int!
  }
  input ItemListFilter {
    search: String
    category: String
    minRating: Int
  }
  input ItemListOptions {
    take: Int
    skip: Int
    sort: ListSort
    filter: ClientListFilter
  }
  extend type Query {
    product(id: ID): Item
    products(options: ClientListOptions): [Item]!
  }
`;

export const resolvers = {
  Query: {
    product: async (_, { id }) => {
      // ...
      return products.find((product) => product.id === id);
    },
    clients: async (
      _,
      { options: { take = 10, skip = 0, sort, filter } = {} }
    ) => {
      // ... implementation
      return {
        itens: filteredProducts.slice(skip, skip + take),
        totalItens: filteredProducts.length,
      };
    },
  },
};
