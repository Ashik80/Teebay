import { createContext } from 'react';
import { makeAutoObservable } from 'mobx';

export default class ProductStore {
  allProducts = [];
  myProducts = [];
  boughtProducts = [];
  selectedProduct = null;

  constructor() {
    makeAutoObservable(this);
  }

  addProduct = (product) => {
    this.allProducts.push(product);
    this.myProducts.push(product);
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

  updateProduct = (product) => {
    let products = this.myProducts.filter((p) => p.id !== product.id);
    products.push(product);
    this.myProducts = products;
  };

  clearAllProducts = () => {
    this.allProducts = [];
    this.myProducts = [];
    this.boughtProducts = [];
    this.selectedProduct = null;
  };
}

export const ProductStoreContext = createContext(new ProductStore());
