import React, { useContext, useEffect } from 'react';
import './Products.css';
import Container from '../../components/container/Container';
import ProductCard from '../../components/product_card/ProductCard';
import { gql, useLazyQuery } from '@apollo/client';
import { GET_PRODCUTS } from '../../api/query';
import { ProductStoreContext } from '../../stores/productStore';
import { observer } from 'mobx-react-lite';

const Products = () => {
  const { setAllProducts, allProducts } = useContext(ProductStoreContext);
  const [get_products, { loading, error }] = useLazyQuery(GET_PRODCUTS);

  useEffect(async () => {
    let result = await get_products();
    if (result.data && result.data.products)
      setAllProducts(result.data.products);
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <div className="page-title">
        <h2>ALL PRODUCTS</h2>
      </div>
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default observer(Products);
