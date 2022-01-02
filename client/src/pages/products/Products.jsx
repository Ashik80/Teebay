import React from 'react';
import './Products.css';
import Container from '../../components/container/Container';
import ProductCard from '../../components/product_card.js/ProductCard';
import { gql, useQuery } from '@apollo/client';

const getProductList = gql`
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

const Products = () => {
  const { loading, error, data } = useQuery(getProductList);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <div className="page-title">
        <h2>ALL PRODUCTS</h2>
      </div>
      {data.products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default Products;
