import React, { useReducer } from 'react';
import './ProductCard.css';
import { Icon } from 'semantic-ui-react';
import CustomModal from '../modal/CustomModal';
import modalReducer from '../../helpers/modalReducer';

const ProductCard = () => {
  const [state, dispatch] = useReducer(modalReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <div className="product-card">
      <Icon
        name="trash"
        className="delete-button"
        size="big"
        onClick={() => dispatch({ type: 'open', size: 'tiny' })}
      />
      <div className="product-tile">
        <h2>Cricket Kit</h2>
      </div>
      <div className="product-category">
        Categories: Sporting goods, Outdoor
      </div>
      <div className="product-price">Price: $500 | Rent: $100 daily</div>
      <div className="product-description">A very nice Cricket Kit</div>
      <div className="product-date">Date posted: 21st August 2022</div>
      <CustomModal size={size} open={open} dispatch={dispatch}>
          <h2>Are you sure you want to delete this product?</h2>
      </CustomModal>
    </div>
  );
};

export default ProductCard;
