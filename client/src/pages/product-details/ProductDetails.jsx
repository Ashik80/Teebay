import React, { useReducer, useState } from 'react';
import './ProductDetails.css';
import Container from '../../components/container/Container';
import { Button, Input } from 'semantic-ui-react';
import CustomModal from '../../components/modal/CustomModal';
import modalReducer from '../../helpers/modalReducer';

const ProductDetails = () => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const [isBuying, setIsBuying] = useState(false);

  return (
    <Container>
      <h2>iPhone 13 pro max</h2>
      <div className="product-category">
        Categories: Sporting goods, Outdoor
      </div>
      <div className="product-price">Price: $500 | Rent: $100 daily</div>
      <div className="product-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </div>
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
