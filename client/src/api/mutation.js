import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $first_name: String!
    $last_name: String!
    $email: String!
    $address: String!
    $phone_number: String!
    $password: String!
  ) {
    register(
      first_name: $first_name
      last_name: $last_name
      email: $email
      address: $address
      phone_number: $phone_number
      password: $password
    ) {
      id
      token
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String!
    $price: Float!
    $rent_price: Float!
    $rent_option: String!
    $userId: Int
    $categories: [Int]
  ) {
    addProduct(
      title: $title
      description: $description
      price: $price
      rent_price: $rent_price
      rent_option: $rent_option
      userId: $userId
      categories: $categories
    ) {
      id
      title
      description
      productCategories {
        category {
          id
          title
        }
      }
    }
  }
`;
