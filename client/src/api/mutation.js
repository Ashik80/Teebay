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
      price
      rent_price
      rent_option
      createdAt
      productCategories {
        category {
          id
          title
        }
      }
    }
  }
`;

export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $id: Int
    $title: String!
    $description: String!
    $price: Float!
    $rent_price: Float!
    $rent_option: String!
    $userId: Int!
    $categories: [Int]
  ) {
    editProduct(
      id: $id
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
      price
      rent_price
      rent_option
      createdAt
      productCategories {
        category {
          id
          title
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: Int) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const BUY_PRODUCT = gql`
  mutation BuyProduct($productId: Int, $userId: Int) {
    buyProduct(productId: $productId, userId: $userId)
  }
`;

export const RENT_PRRODUCT = gql`
  mutation RentProduct(
    $productId: Int
    $userId: Int
    $start_date: Date
    $end_date: Date
  ) {
    rentProduct(
      productId: $productId
      userId: $userId
      start_date: $start_date
      end_date: $end_date
    )
  }
`;
