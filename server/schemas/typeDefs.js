const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    coffeeShops: [CoffeeShop]
  }

  type CoffeeShop {
    _id: ID
    name: String
    location: String
    rating: Float
    review: String
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    coffeeShops: [CoffeeShop]
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    addCoffeeShop(name: String!, location: String!, rating: Int!, review: String!): CoffeeShop
    updateCoffeeShop(id: ID!, name: String, location: String, rating: Int, review: String): CoffeeShop
    deleteCoffeeShop(id: ID!): CoffeeShop
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;
