import React from 'react';
import './Products.css';
import Container from '../../components/container/Container';
import ProductCard from '../../components/product_card.js/ProductCard';

const Products = () => {
  return (
    <Container>
      <div className="page-title">
        <h2>ALL PRODUCTS</h2>
      </div>
      <ProductCard />
      <ProductCard />
    </Container>
  );
};

export default Products;
