import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation {
    signup($email: String!, $username: String!, $password: String!) {
      signup(email: $email, username: $username, password: $password) {
        token
        user {
          id
          username
          email
        }
      }
    }
  }
`;

export const LOGIN = gql`
  mutation {
    login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        token
        user {
          id
          username
          email
        }
      }
    }
  }
`;

export const GET_USER = gql`
 query {
   user($id: ID!) {
     user(id: $id)
   }
 }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
      email
    }
  }
`;

export const DELETE_USER = gql`
  mutation {
    deleteUser($id: ID!) {
      deleteUser(id: $id) {
        id
      }
    }
  }
`;
