import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import Container from "../src/components/container/Container";
import Navbar from "../src/components/navbar/Navbar";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/react-testing";
import ProductCard from "../src/components/product_card/ProductCard";
import Dashboard from "../src/pages/dashboard/Dashboard";
import CustomModal from "../src/components/modal/CustomModal";
import {
  DELETE_PRODUCT_MOCK,
  GET_MY_PRODCUTS_MOCK,
  localStorageMock,
  PRODUCT_MOCK,
} from "./mocks";

describe("Testing components", () => {
  test("container component works", () => {
    render(
      <Container>
        <h1>Hello</h1>
      </Container>
    );

    expect(screen.getByText(/hello/i)).toBeTruthy();
  });

  test("navbar renders", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <Navbar setLoggedIn={true} />
      </MemoryRouter>
    );

    expect(screen.getByRole("list")).toBeTruthy();
  });

  test("app renders with dashboard component", async () => {
    localStorageMock();
    const app = render(
      <MemoryRouter initialEntries={[{ pathname: "/" }]}>
        <MockedProvider mocks={GET_MY_PRODCUTS_MOCK}>
          <Dashboard />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));

    expect(
      screen.getByRole("heading", { name: /my products/i })
    ).toBeInTheDocument();
  });

  test("product card renders", () => {
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
  });

  test("custom modal component renders", () => {
    render(
      <CustomModal size={"small"} open={true}>
        <h1>Hello</h1>
      </CustomModal>
    );

    expect(screen.getByRole("heading", { name: /hello/i })).toBeInTheDocument();
  });
});
