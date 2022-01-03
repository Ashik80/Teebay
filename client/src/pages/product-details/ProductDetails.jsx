import React, { useContext, useEffect, useReducer, useState } from 'react';
import './ProductDetails.css';
import Container from '../../components/container/Container';
import modalReducer from '../../helpers/modalReducer';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import formatCategoryTitles from '../../helpers/categoryTitlesFormat';
import { GET_PRODUCT } from '../../api/query';
import { getAuth } from '../../auth/auth';
import { BUY_PRODUCT, RENT_PRRODUCT } from '../../api/mutation';
import { toast } from 'react-toastify';
import { ProductStoreContext } from '../../stores/productStore';
import { observer } from 'mobx-react-lite';
import ButtonGroup from './ButtonGroup';
import BuyModal from './BuyModal';
import RentModal from './RentModal';

const ProductDetails = () => {
  const { id } = useParams();

  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  const {
    selectProduct,
    selectedProduct,
    buySelectedProduct,
    rentSelectedProduct,
  } = useContext(ProductStoreContext);
  const [categories, setCategories] = useState('');
  const [isBuying, setIsBuying] = useState(false);

  const [load_product, { loading, error }] = useLazyQuery(GET_PRODUCT);
  const [buy_product] = useMutation(BUY_PRODUCT);
  const [rent_product] = useMutation(RENT_PRRODUCT);

  const setCategoryTitles = (prodCategories) => {
    let catTitles = formatCategoryTitles(prodCategories);
    setCategories(catTitles);
  };

  useEffect(async () => {
    selectProduct(parseInt(id));
    if (selectedProduct) {
      setCategoryTitles(selectedProduct.productCategories);
    } else {
      let result = await load_product({
        variables: { id: parseInt(id) },
      });
      if (result.data && result.data.product) {
        selectProduct(result.data.product.id);
        setCategoryTitles(result.data.product.productCategories);
      }
    }
  }, [id, selectedProduct]);

  const buyProduct = async () => {
    let result = await buy_product({
      variables: {
        productId: parseInt(id),
        userId: parseInt(getAuth().id),
      },
    });
    console.log(result);
    if (result.data) {
      buySelectedProduct();
      toast(result.data.buyProduct);
      dispatch({ type: 'close' });
    }
  };

  const [rentDate, setRentDate] = useState({
    startDate: '',
    endDate: '',
  });

  const rentProduct = async () => {
    console.log(rentDate);
    let result = await rent_product({
      variables: {
        productId: parseInt(id),
        userId: parseInt(getAuth().id),
        start_date: rentDate.startDate,
        end_date: rentDate.endDate,
      },
    });
    console.log(result);
    if (result.data) {
      rentSelectedProduct();
      toast(result.data.rentProduct);
      dispatch({ type: 'close' });
    }
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <Container>
      <h2>{selectedProduct?.title}</h2>
      <div className="product-category">Categories: {categories}</div>
      <div className="product-price">
        Price: ${selectedProduct?.price} | Rent: ${selectedProduct?.rent_price}{' '}
        {selectedProduct?.rent_option}
      </div>
      <div className="product-description">{selectedProduct?.description}</div>
      <div className="product-action-button">
        {!selectedProduct?.isBought && (
          <ButtonGroup
            isRented={selectedProduct?.isRented}
            setIsBuying={setIsBuying}
            dispatch={dispatch}
          />
        )}
      </div>
      {isBuying ? (
        <BuyModal
          size={size}
          open={open}
          dispatch={dispatch}
          buyProduct={buyProduct}
        />
      ) : (
        <RentModal
          size={size}
          open={open}
          dispatch={dispatch}
          rentDate={rentDate}
          rentProduct={rentProduct}
          setRentDate={setRentDate}
        />
      )}
    </Container>
  );
};

export default observer(ProductDetails);
