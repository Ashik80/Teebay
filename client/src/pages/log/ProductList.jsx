import React, { useEffect } from 'react';
import Container from '../../components/container/Container';
import ProductCard from '../../components/product_card/ProductCard';

const ProductList = ({ products }) => {
  return (
    <Container>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;
