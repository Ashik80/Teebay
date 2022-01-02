import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import Container from '../../components/container/Container';
import ProductForm from '../../components/product_form/ProductForm';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT } from '../../api/query';
import { ADD_PRODUCT } from '../../api/mutation';
import { getAuth } from '../../auth/auth';

const AddProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const [categories, setCategories] = useState([]);

  const [getProduct, { loading, error }] = useLazyQuery(GET_PRODUCT);
  const [addProduct] = useMutation(ADD_PRODUCT);

  useEffect(async () => {
    let result = await getProduct({
      variables: { id: parseInt(id) },
    });
    setProduct(result.data.product);
  }, []);

  const onSubmit = async (productData) => {
    productData.categories = categories;
    productData.price = parseFloat(productData.price);
    productData.rent_price = parseFloat(productData.rent_price);
    productData.userId = parseInt(getAuth().id);
    let result = await addProduct({
      variables: productData,
    });
    // if(result.data.product)
    console.log(result);
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <Container>
      <ProductForm
        product={product}
        onSubmit={onSubmit}
        setCategories={setCategories}
      />
    </Container>
  );
};

export default AddProduct;
