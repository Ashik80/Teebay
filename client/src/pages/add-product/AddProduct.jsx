import React, { useState, useEffect } from 'react';
import './AddProduct.css';
import Container from '../../components/container/Container';
import ProductForm from '../../components/product_form/ProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_PRODUCT } from '../../api/query';
import { ADD_PRODUCT, EDIT_PRODUCT } from '../../api/mutation';
import { getAuth } from '../../auth/auth';
import { ProductStoreContext } from '../../stores/productStore';
import { useContext } from 'react';
import { observer } from 'mobx-react-lite';

const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addProduct, updateProduct } = useContext(ProductStoreContext);

  const [editting, setEditting] = useState(false);
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const [getProduct] = useLazyQuery(GET_PRODUCT);
  const [add_product, { loading, error }] = useMutation(ADD_PRODUCT);
  const [edit_product] = useMutation(EDIT_PRODUCT);

  useEffect(async () => {
    if (id) {
      setEditting(true);
      let result = await getProduct({
        variables: { id: parseInt(id) },
      });
      setProduct(result.data.product);
    } else {
      setEditting(false);
    }
  }, [id]);

  const onSubmit = async (productData) => {
    console.log(productData)
    productData.categories = categories;
    productData.price = parseFloat(productData.price);
    productData.rent_price = parseFloat(productData.rent_price);
    productData.userId = parseInt(getAuth().id);
    if (!editting) {
      let result = await add_product({
        variables: productData,
      });
      if (result.data && result.data.product) {
        addProduct(result.data.product);
      }
    } else {
      productData.id = parseInt(id);
      let result = await edit_product({
        variables: productData,
      });
      if(result.data && result.data.product) {
        updateProduct(result.data.product)
      }
      console.log(result.data)
    }
    navigate('/');
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

export default observer(AddProduct);
