import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
        _id
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        email
        username
      }
    }
  }
`;

export const ADD_COFFEE_SHOP = gql`
  mutation addCoffeeShop($name: String!, $location: String!, $rating: Int!, $review: String!) {
    addCoffeeShop(name: $name, location: $location, rating: $rating, review: $review) {
      _id
      name
      location
      rating
      review
    }
  }
`;

export const UPDATE_COFFEE_SHOP = gql`
  mutation updateCoffeeShop($id: ID!, $name: String, $location: String, $rating: Int, $review: String) {
    updateCoffeeShop(id: $id, name: $name, location: $location, rating: $rating, review: $review) {
      _id
      name
      location
      rating
      review
    }
  }
`;

export const DELETE_COFFEE_SHOP = gql`
  mutation deleteCoffeeShop($id: ID!) {
    deleteCoffeeShop(id: $id) {
      _id
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
      username
    }
  }
`;
