import React, { useEffect, useReducer, useState } from 'react';
import './ProductDetails.css';
import Container from '../../components/container/Container';
import { Button, Input } from 'semantic-ui-react';
import CustomModal from '../../components/modal/CustomModal';
import modalReducer from '../../helpers/modalReducer';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import formatCategoryTitles from '../../helpers/categoryTitlesFormat';

const ProductDetails = () => {
  const { id } = useParams();

  const getProduct = gql`
    query {
      products(id: ${id}) {
        id
        title
        price
        rent_price
        rent_option
        description
        productCategories {
          category {
            title
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getProduct, {
    variables: { id },
  });

  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const [categories, setCategories] = useState('');
  const [product, setProduct] = useState();
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    if (data && data.products) {
      setProduct(data.products[0]);
      let catTitles = formatCategoryTitles(data.products[0].productCategories);
      setCategories(catTitles);
    }
  }, [data]);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <h2>{product?.title}</h2>
      <div className="product-category">Categories: {categories}</div>
      <div className="product-price">
        Price: ${product?.price} | Rent: ${product?.rent_price}{' '}
        {product?.rent_option}
      </div>
      <div className="product-description">{product?.description}</div>
      <div className="product-action-button">
        <Button
          color="violet"
          onClick={() => {
            setIsBuying(true);
            dispatch({ type: 'open', size: 'tiny' });
          }}
        >
          Buy
        </Button>
        <Button
          color="violet"
          onClick={() => {
            setIsBuying(false);
            dispatch({ type: 'open', size: 'tiny' });
          }}
        >
          Rent
        </Button>
      </div>
      {isBuying ? (
        <CustomModal size={size} open={open} dispatch={dispatch}>
          <h2>Are you sure you want to buy this product?</h2>
        </CustomModal>
      ) : (
        <CustomModal size={size} open={open} dispatch={dispatch}>
          <h2 className="rent-form-title">Rental Period</h2>
          <div className="rent-form">
            <Input type="date" label="From" size="small" />
            <Input type="date" label="To" size="small" />
          </div>
        </CustomModal>
      )}
    </Container>
  );
};

export default ProductDetails;
