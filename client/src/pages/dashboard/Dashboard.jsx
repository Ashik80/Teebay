import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/product_card.js/ProductCard';
import './Dashboard.css';
import { Button } from 'semantic-ui-react';
import Container from '../../components/container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import { getAuth } from '../../auth/auth';
import { Link } from 'react-router-dom';

const getProductList = gql`
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
      productCategories {
        category {
          title
        }
      }
    }
  }
`;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [getMyProducts, { loading, error, data }] =
    useLazyQuery(getProductList);

  useEffect(async () => {
    let result = await getMyProducts({
      variables: { userId: getAuth().id },
    });
    setProducts(result.data.products);
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <div className="page-title">
        <h2>MY PRODUCTS</h2>
      </div>
      <Link to="/add-product">
        <Button color="violet" className="product-add-button">
          Add Product
        </Button>
      </Link>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default Dashboard;
