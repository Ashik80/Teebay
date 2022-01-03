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
  const [add_product] = useMutation(ADD_PRODUCT);
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
    productData.categories = categories;
    productData.price = parseFloat(productData.price);
    productData.rent_price = parseFloat(productData.rent_price);
    productData.userId = parseInt(getAuth().id);
    if (!editting) {
      let result = await add_product({
        variables: productData,
        update: (cache, { data }) => {
          const cacheId = cache.identify(data.addProduct);
          console.log(cacheId);
          cache.modify({
            fields: {
              products: (existingFieldData, { toReference }) => {
                console.log(existingFieldData);
                return [...existingFieldData, toReference(cacheId)];
              },
            },
          });
        },
      });
      if (result.data) {
        addProduct(result.data.addProduct);
        navigate('/');
      }
    } else {
      productData.id = parseInt(id);
      let result = await edit_product({
        variables: productData,
      });
      if (result.data) {
        updateProduct(result.data.editProduct);
        navigate('/');
      }
    }
  };

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
