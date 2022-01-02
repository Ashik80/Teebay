import { gql } from '@apollo/client';

export const GET_PRODCUTS = gql`
  query {
    products {
      id
      title
      price
      rent_price
      rent_option
      description
      createdAt
      userId
      productCategories {
        category {
          title
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query Product($id: Int) {
    product(id: $id) {
      id
      title
      price
      rent_price
      rent_option
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

export const GET_MY_PRODUCTS = gql`
  query GetMyProducts($userId: Int) {
    products(userId: $userId) {
      id
      title
      price
      rent_price
      rent_option
      description
      createdAt
      userId
      productCategories {
        category {
          title
        }
      }
    }
  }
`;
