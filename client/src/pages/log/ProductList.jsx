import React, { useEffect } from 'react';
import Container from '../../components/container/Container';
import ProductCard from '../../components/product_card/ProductCard';

const ProductList = ({ products }) => {
  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <Container>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;
