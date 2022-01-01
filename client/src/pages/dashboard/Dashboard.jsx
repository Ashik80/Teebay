import React, { useEffect } from 'react';
import ProductCard from '../../components/product_card.js/ProductCard';
import './Dashboard.css';
import { Button } from 'semantic-ui-react';
import Container from '../../components/container/Container';
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
      productCategories {
        category {
          title
        }
      }
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(getProductList);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <div className="page-title">
        <h2>MY PRODUCTS</h2>
      </div>
      <Button color="violet" className="product-add-button">
        Add Product
      </Button>
      {data.products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default Dashboard;
