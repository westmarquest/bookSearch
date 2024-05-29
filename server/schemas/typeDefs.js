const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    me: User
    savedBooks: [Book]
    bookCount: Int
  }

  input BookInput {
    authors: [String!]!
    description: String
    title: String!
    bookId: ID!
    image: String
    link: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: BookInput!): User
    removeBook(bookId: ID!): User
  }

  type User {
    id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String!]!
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;