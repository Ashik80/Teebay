import { DELETE_PRODUCT } from "../src/api/mutation";
import { GET_MY_PRODUCTS } from "../src/api/query";

export const mockProductId = 1;
export const mockUserId = 1;

export const PRODUCT_MOCK = {
  id: mockProductId,
  title: "Mock Iphone",
  description: "Mock Description",
  price: 4.08,
  rent_price: 3.2,
  rent_option: "per day",
  isBought: false,
  isRented: false,
  userId: mockUserId,
  productCategories: [{ category: { id: 1, title: "Electronics" } }],
  createdAt: new Date(),
};

export const GET_MY_PRODCUTS_MOCK = [
  {
    request: {
      query: GET_MY_PRODUCTS,
      variables: {
        userId: mockUserId,
      },
    },
    result: {
      data: {
        products: [PRODUCT_MOCK, { ...PRODUCT_MOCK, id: 2 }],
      },
    },
  },
];

export const DELETE_PRODUCT_MOCK = [
  {
    request: {
      query: DELETE_PRODUCT,
      variables: {
        id: mockProductId,
      },
    },
    result: {
      data: {
        deleteProduct: {
          id: mockProductId,
        },
      },
    },
  },
];

export const localStorageMock = () => {
  localStorage.setItem("auth", JSON.stringify({ id: mockUserId }));
};
