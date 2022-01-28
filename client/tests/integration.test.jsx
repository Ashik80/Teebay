import React from "react";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import {
  DELETE_PRODUCT_MOCK,
  localStorageMock,
  mockProductId,
  PRODUCT_MOCK,
} from "./mocks";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ProductCard from "../src/components/product_card/ProductCard";

test("product can be deleted", () => {
  localStorageMock();
  render(
    <MemoryRouter initialEntries={[{ pathname: "/" }]}>
      <MockedProvider mocks={DELETE_PRODUCT_MOCK}>
        <ProductCard product={PRODUCT_MOCK} />
      </MockedProvider>
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /mock iphone/i })
  ).toBeInTheDocument();

  fireEvent.click(screen.getByTitle("delete-product"));

  const confirmDeleteBtn = screen.getByRole("button", { name: /yes/i });

  expect(confirmDeleteBtn).toBeInTheDocument();

  fireEvent.click(confirmDeleteBtn);

  const deleteMutation = DELETE_PRODUCT_MOCK[0].result.data.deleteProduct;

  expect(deleteMutation).toMatchObject({ id: mockProductId });
});
