import React, { useEffect, useState, useContext } from 'react';
import ProductCard from '../../components/product_card/ProductCard';
import './Dashboard.css';
import { Button } from 'semantic-ui-react';
import Container from '../../components/container/Container';
import { gql, useLazyQuery } from '@apollo/client';
import { getAuth } from '../../auth/auth';
import { Link } from 'react-router-dom';
import { GET_MY_PRODUCTS } from '../../api/query';
import { ProductStoreContext } from '../../stores/productStore';
import { observer } from 'mobx-react-lite';

const Dashboard = () => {
  const { myProducts, setMyProducts } = useContext(ProductStoreContext);
  const [getMyProducts, { loading, error }] = useLazyQuery(GET_MY_PRODUCTS);

  useEffect(async () => {
    let result = await getMyProducts({
      variables: { userId: getAuth().id },
    });
    setMyProducts(result.data.products);
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
      {myProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default observer(Dashboard);
