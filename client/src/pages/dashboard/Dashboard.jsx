import React from 'react';
import ProductCard from '../../components/product_card.js/ProductCard';
import './Dashboard.css';
import { Button } from 'semantic-ui-react';
import Container from '../../components/container/Container';


const Dashboard = () => {
  return (
    <Container>
      <Button color="violet" className="product-add-button">
        Add Product
      </Button>
      <ProductCard />
      <ProductCard />
    </Container>
  );
};

export default Dashboard;
