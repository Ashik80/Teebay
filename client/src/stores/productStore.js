import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  allProducts = [];
  myProducts = [];
  boughtProducts = [];
  soldProducts = [];
  borrowedProducts = [];
  lentProducts = [];
  selectedProduct = null;

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = (product) => {
    this.allProducts = [...this.allProducts, product];
    this.myProducts = [...this.myProducts, product];
    console.log(this.myProducts);
  };

  updateProduct = (product) => {
    let products = this.myProducts.filter((p) => p.id !== product.id);
    let allProducts = this.allProducts.filter((p) => p.id !== product.id);
    products.push(product);
    allProducts.push(product);
    this.myProducts = products;
    this.allProducts = allProducts;
  };

  deleteProduct = (id) => {
    this.allProducts = this.allProducts.filter((p) => p.id !== id)[0];
    this.myProducts = this.myProducts.filter((p) => p.id !== id)[0];
  };

  setMyProducts = (products) => {
    this.myProducts = products;
  };

  setAllProducts = (products) => {
    this.allProducts = products;
  };

  setBoughtProducts = (products) => {
    this.boughtProducts = products;
  };

  setSoldProducts = (products) => {
    this.soldProducts = products;
  };

  setBorrowedProducts = (products) => {
    this.borrowedProducts = products;
  };

  setLentProducts = (products) => {
    this.lentProducts = products;
  };

  selectProduct = (id) => {
    this.selectedProduct = this.allProducts.filter((p) => p.id === id)[0];
  };

  buySelectedProduct = () => {
    this.selectedProduct.isBought = true;
    let prodlist = this.allProducts.filter(
      (p) => p.id !== this.selectedProduct.id
    )[0];
    prodlist.push(this.selectedProduct);
    this.allProducts = prodlist;
  };

  rentSelectedProduct = () => {
    this.selectedProduct.isRented = true;
    let prodlist = this.allProducts.filter(
      (p) => p.id !== this.selectedProduct.id
    )[0];
    prodlist.push(this.selectedProduct);
    this.allProducts = prodlist;
  };

  clearAllProducts = () => {
    this.allProducts = [];
    this.myProducts = [];
    this.boughtProducts = [];
    this.soldProducts = [];
    this.borrowedProducts = [];
    this.lentProducts = [];
    this.selectedProduct = null;
  };
}

export const ProductStoreContext = createContext(new ProductStore());
