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
      isBought
      isRented
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
      isBought
      isRented
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
      isBought
      isRented
      productCategories {
        category {
          title
        }
      }
    }
  }
`;

export const BOUGHT_PRODUCTS = gql`
  query BoughtProducts($userId: Int) {
    boughtProducts(userId: $userId) {
      id
      title
      description
      price
      rent_price
      rent_option
      createdAt
      productCategories {
        category {
          title
        }
      }
    }
  }
`;
